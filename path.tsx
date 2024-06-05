type Path<T> = T extends object ? {
  [K in keyof T]: K extends string ? `${K}` | `${K}.${Path<T[K]>}` : never
}[keyof T] : never;

type PathValue<T, P extends string> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? PathValue<T[K], Rest>
    : never
  : P extends keyof T
  ? T[P]
  : never;


function getByPath<T, P extends Path<T>>(obj: T, path: P): PathValue<T, P> {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj) as PathValue<T, P>;
}

// Example usage
const obj = {
  user: {
    name: 'John Doe',
    age: 30,
    address: {
      city: 'New York',
      country: 'USA'
    }
  }
};

const name = getByPath(obj, 'user.name'); // 'John Doe'
const city = getByPath(obj, 'user.address.city'); // 'New York'

function setByPath<T, P extends Path<T>>(obj: T, path: P, value: PathValue<T, P>): T {
  const parts = path.split('.');
  const last = parts.pop() as string;
  const target = parts.reduce((acc, part) => {
    if (!acc[part]) acc[part] = {} as any;
    return acc[part];
  }, obj as any);

  target[last] = value;
  return obj;
}

// Example usage
const obj = {
  user: {
    name: 'John Doe',
    age: 30,
    address: {
      city: 'New York',
      country: 'USA'
    }
  }
};

const updatedObj = setByPath(obj, 'user.name', 'Jane Smith');
// updatedObj = { user: { name: 'Jane Smith', age: 30, address: { city: 'New York', country: 'USA' } } }

const anotherUpdatedObj = setByPath(obj, 'user.address.city', 'Los Angeles');
// anotherUpdatedObj = { user: { name: 'John Doe', age: 30, address: { city: 'Los Angeles', country: 'USA' } } }




import React, { useState } from 'react';

interface User {
  name: string;
  age: number;
  address: {
    city: string;
    country: string;
  };
}

const UserComponent: React.FC = () => {
  const [user, setUser] = useState<User>({
    name: 'John Doe',
    age: 30,
    address: {
      city: 'New York',
      country: 'USA'
    }
  });

  const name = getByPath(user, 'name');
  const city = getByPath(user, 'address.city');

  const handleNameChange = (newName: string) => {
    const updatedUser = setByPath({ ...user }, 'name', newName);
    setUser(updatedUser);
  };

  return (
    <div>
      <p>Name: {name}</p>
      <p>City: {city}</p>
      <button onClick={() => handleNameChange('Jane Doe')}>Change Name</button>
    </div>
  );
};

export default UserComponent;
