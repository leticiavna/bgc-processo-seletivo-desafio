import React, { useState } from "react";import "./Home.css";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Login.css";
import { API } from "aws-amplify"; // vai chamar o backend
import { useFormFields } from "../libs/hooksLib";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  
  const [fields, handleFieldChange] = useFormFields({
    name:"",
    email: "",
    minions: ""
  });

  function validateForm() {
    return fields.name.length > 0 && fields.email.length > 0 && fields.minions.size > 0;
  }

  async function handleSubmit(event) {
  event.preventDefault();
  
  setIsLoading(true);
  }
  
  
  return (
    <div className="Home container">
      <section className="lander">
        <h1>Lorem Ipsum 2</h1>
        <p>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."</p>
      </section>
      <section>
        colocar os minions aqui?
      </section>
      <section className="Purchase container">
      <div className="form-purchase-minion">
        <h2 className="text-center"> reserve já o seu! </h2>
        <form onSubmit={handleSubmit}>
            <FormGroup controlId="nome" bsSize="large">
              <ControlLabel>nome: </ControlLabel>
              <FormControl
                autoFocus
                type="text"
                value={fields.name}
                onChange={handleFieldChange}
              />
            </FormGroup>
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>email:</ControlLabel>
              <FormControl
                autoFocus
                type="email"
                value={fields.email}
                onChange={handleFieldChange}
              />
            </FormGroup>
            <FormGroup controlId="minions" bsSize="large">
              <ControlLabel>minions que eu quero:</ControlLabel>
              <FormControl
                componentClass="select" multiple
                autoFocus
                type="select"
                value={fields.minions}
                onChange={handleFieldChange}
              >
                <option value="select">select (multiple)</option>
                <option value="other">...</option>
              </FormControl>
            </FormGroup>
          </form>
        </div>
      </section>
    </div>
  );
}