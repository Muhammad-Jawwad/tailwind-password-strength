import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './App.css';
import TailwindPasswordStrength from './components/tailwindPasswordStrength'; // Make sure to import it correctly

function App() {
  const { register, formState: { errors }, watch } = useForm();
  // Watch the password input
  const password = watch("password");

  const handlePasswordChange = (password: any) => {
    console.log("New password:", password);
  };

  return (
    <div className="App p-8">
      <h1>Testing Password Strength Component</h1>
      <TailwindPasswordStrength
        error={false}
        passwordCriteria={{ minLength: 10, hasUpperCase: true, hasSpecialChar: true }}
        criteriaMessages={{
          minLength: "Password must be at least 10 characters.",
          hasUpperCase: "Password needs at least one uppercase letter.",
          hasSpecialChar: "A special character is recommended."
        }}
        onChange={handlePasswordChange}
      />
    </div>
  );
}

export default App;
