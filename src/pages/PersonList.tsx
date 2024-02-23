import React, { useEffect, useRef, useState } from 'react';
import { Person } from "../types/person";
import { useMediaQuery, useTheme } from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef, GridRowId } from '@mui/x-data-grid';
import PersonView from '../components/PersonView';
import './PersonList.scss';

const PersonList= () => {
    const [error, setError] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);
    const [persons, setPersons] = useState<Person[]>([]);
    const [person, setPerson] = useState<Person>();
    const [isSelected, setIsSelected] = useState(false);

    const abortControllerRef = useRef<AbortController | null>(null);
    const isDesktop = useMediaQuery('(min-width: 768px)');

    const handleSelectionModelChange = (selectionModel: GridRowId[]) => {
        const personId = selectionModel.toString();
        const p = persons.filter(item => item.id.name + item.id.value === personId);

        if (p.length > 0) {
            setPerson(p[0]);
            setIsSelected(true);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();

            try {
                const response = await fetch('https://randomuser.me/api/?results=100&inc=id,name,phone,email,nat,picture,location,dob');
                const data = (await response.json()).results as Person[];

                const filteredArray = data.filter(item => item.id.name !== null && item.id.value !== null);
                setPersons(filteredArray);

            } catch (e: any) {
                setError(e);
            }
            setIsLoading(false);
        }
        fetchData();
    }, []);


    const backToList = () => {
        setIsSelected(false);
    }


    const mobileColumns: GridColDef[] = [
        {
            field: 'picture',
            headerName: '',
            flex: 0.5,
            renderCell: (params) => (
                <img className="thumbnail" src={params.row.picture.thumbnail} alt="Image" />
            ),
        },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            valueGetter: (params) => {
                return params.row.name.first + " " + params.row.name.last
            }
        }
    ];

    const desktopColumns: GridColDef[] = [
        {
            field: 'picture',
            headerName: '',
            flex: 0.5,
            renderCell: (params) => (
                <img src={params.row.picture.thumbnail} alt="Image"/>
            ),
        },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            valueGetter: (params) => {
                return params.row.name.first + " " + params.row.name.last
            }
        },
        {
            field: 'phone',
            headerName: 'Phone number',
            flex: 1,
        },
        {
            field: 'email',
            headerName: 'email',
            flex: 1,
        },
        {
            field: 'nat',
            headerName: 'Nationality',
            flex: 1,
        },

    ];
    const showList = () =>{
        if (isDesktop ) return true;
        if (isSelected && !isDesktop) return false;
        return true;
    }

    const showDetail = ()=>{
        if (isDesktop && person) return true;
        if (!isSelected && !isDesktop) return false;
        return true;
    }


    if (isLoading) {
        return <div> Loading...</div>
    }

    if (error) {
        return <div> Something went wrong. Please refresh the page</div>
    }

    return (
        <div className="container">
            {showList() &&  (
                <div className='list'>
                    <DataGrid
                        rows={persons}
                        columns={isDesktop ? desktopColumns : mobileColumns }
                        getRowId={(row) => row.id.name + row.id.value}
                        onRowSelectionModelChange={handleSelectionModelChange}
                    />
                </div>
            )} 
            {showDetail() && person && (
                <div className='detail'>
                    <PersonView person={person} />
                </div>
            )}

            {person && isSelected && !isDesktop && (
                <button className="back-button" onClick={() => backToList() }> Back to list </button>
            )}
        </div>
    );
};

export default PersonList;