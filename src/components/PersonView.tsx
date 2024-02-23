import React from 'react';
import { Person } from "../types/person";
import './PersonView.scss';

interface Props {
  person: Person;
}

const PersonView: React.FC<Props> = ({ person }) => {

  const formatDateOfBirth = (dateString : string) =>  {
    const dateOfBirth = new Date(dateString);
  
    if (isNaN(dateOfBirth.getTime())) return "Invalid date";
  
    // Format as "DD-MM-YYYY"
    const timeRemoved = dateOfBirth.toISOString().split('T')[0];
    const parts = timeRemoved.split('-');
    const correctFormat = `${parts[2]}-${parts[1]}-${parts[0]}`;
    return correctFormat;
  }

  return (
    <div className="person-container">
      <div className="header-container">
        <div className="image-container">
        <div className="round">
           <img src={person.picture.large} alt="Image" /></div>
        </div>
        <div className='name'>{`${person.name.first} ${person.name.last}`}</div>
      </div>

      <div className="contact-info-container">
        <span className="material-icons first-column">phone</span>
        <div className='title'> Phone number <br />
          <div className="text">{person.phone} </div>
        </div>

        <span className="material-icons first-column">email</span>
        <div className='title'> Email address <br />
          <div className='text'>{person.email}</div>
        </div>

        <span className="material-icons first-column">cake</span>
        <div className='title'> Date of birth<br />
          <div className='text'>{formatDateOfBirth(person.dob.date)}</div>
        </div>
      </div>

      <div className="title-container"> </div>
      <div className="contact-info-container">
        <span className="material-icons first-column">home</span>
        <div className='title'> Street <br />
          <div className='text'>{`${person.location.street.number}  ${person.location.street.name} `}</div>
        </div>

        <span className="material-icons first-column">location_city</span>
        <div className='title'> City <br />
          <div className='text'>{person.location.city}</div>
        </div>

        <span className="material-icons first-column">apartment</span>
        <div className='title'> State <br />
          <div className='text'>{person.location.state}</div>
        </div>

        <span className="material-icons first-column">flag</span>
        <div className='title'> Country <br />
          <div className='text'>{person.location.country}</div>
        </div>
      </div>
    </div>
  );
};

export default PersonView;