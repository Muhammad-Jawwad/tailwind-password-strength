import { useState } from 'react';
import './App.css';
import TailwindPasswordStrength from './components/tailwindPasswordStrength';

function App() {
  const [password, setPassword] = useState("");

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
    console.log("Current Password: ", newPassword);
  };

  return (
    <>
      <div>
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
        {/* Display the current password below */}
        <p className="mt-4">Current Password: {password}</p>
      </div>
    </>
  );
}

export default App;
