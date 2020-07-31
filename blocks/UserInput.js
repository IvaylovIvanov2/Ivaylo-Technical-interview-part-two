import React from 'react';

const editableInputs = ['name', 'username', 'email', 'address.street', 'address.suite', 'address.city', 'phone', 'website'];

function UserInput({ inputItem, inputItemKey, onChange }) {
    const isReadOnly = editableInputs.indexOf(inputItemKey) === -1;
    if(typeof(inputItem) == "object"){
        return Object.keys(inputItem).map(key => {
            return <UserInput key={key} inputItem={inputItem[key]} inputItemKey={`${inputItemKey}.${key}`} onChange={onChange} />
        });
    }

    return (
        <div className="UserInputField">
            <label>{inputItemKey}: </label>
            <input id={inputItemKey} onChange={(e) => { onChange(e.target) }} onClick={(e) => e.stopPropagation()} defaultValue={inputItem} readOnly={isReadOnly}/>
        </div>
    );
}

export default UserInput;