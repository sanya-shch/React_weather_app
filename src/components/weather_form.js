import React from 'react';

const Form = props => (
    <form onSubmit={props.gettingWeather}>

        <div className="input-group mb-3">
            <input type="text" name="city" className="form-control" placeholder="City"/>
            <div className="input-group-append">
                <button className="btn btn-dark">Get current weather</button>
            </div>
        </div>
    </form>
);

export default Form;
