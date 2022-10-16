import { Component } from 'react';
import { nanoid } from 'nanoid';
import { PropTypes } from 'prop-types';

export class ContactForm extends Component {
  INITIAL_STATE = {
    name: '',
    number: '',
  };

  state = this.INITIAL_STATE;

  reset = () => {
    this.setState(this.INITIAL_STATE);
  };

  inputHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submitHandler = e => {
    e.preventDefault();

    const data = {
      id: nanoid(),
      name: this.state.name,
      number: this.state.number,
    };

    this.props.onAddContact(data);

    this.reset();
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className="form" onSubmit={this.submitHandler}>
        <label>
          <span>Name:</span>
          <input
            onChange={this.inputHandler}
            value={name}
            placeholder="Enter your name"
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>

        <label>
          <span>Number:</span>
          <input
            onChange={this.inputHandler}
            value={number}
            placeholder="Enter your number"
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>

        <button type="submit">Add contact</button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
