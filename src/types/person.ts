export interface Person {
    id: {
        name: string;
        value:string;
    };
    name: {
        first: string;
        last: string;
    };
    phone: number;
    email: string;
    nat: string;
    picture: {
        large:string;
        medium:string;
        thumbnail: string;
    };
    location: {
        street: {
          number: number,
          name: string,
        },
        city: string,
        state: string,
        country: string,
        postcode: string,
      },
      dob: {
        date: string,
        age: number
      },
  }