import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "../common/input";
import "bootstrap/dist/js/bootstrap.js";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const option = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, option);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    console.log(e.state);

    this.doSubmit();
  };

  handelChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    console.log(input);
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderDropDown(items, lable) {
    return (
      <div className="form-group">
        <label htmlFor="state">{lable}</label>
        <select
          name="genreId"
          onChange={this.handelChange}
          className="custom-select d-block"
        >
          {items.map(item => (
            <option key={item.id || item.name} value={item["id"]}>
              {item["name"]}
            </option>
          ))}
        </select>
        {/* {error && <div className="alert alert-danger">DropDown is Empty</div>} */}
      </div>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        lable={label}
        onChange={this.handelChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
