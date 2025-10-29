import React from "react";
import classNames from "classnames";

export default function FormControl(props) {
    const formGroupClasses = [
        'flex',
    ]

    const formNameClasses = [
        'text-2xl',
    ]

    const formNameCheckboxClasses = [
        'control',
    ]

    const formControlClasses = [
        'ml-auto',
        'w-96',
        'text-xl',
        'bg-transparent',
        'outline-none',
    ]

    const formCheckboxClasses = [
        'control__indicator'
    ]

    const typeControl = (Control) => {
        if (Control === 'textarea') return <textarea className={classNames(formControlClasses.join(' '), props.classAddControl)} id={props.Id} placeholder={props.Placeholder} value={props.Value} onChange={props.OnChange} />
        else if (Control === 'checkbox') 
            return ( 
                <label className={classNames(formNameCheckboxClasses.join(' '), props.classAddNameCheckbox)}>
                    { props.LabelCheckbox }
                    <input type="checkbox" id={props.Id} />
                    <div className={classNames(formCheckboxClasses.join(' '), props.classAddControlCheckbox)}></div>
                </label> 
            )
        else return  <input className={classNames(formControlClasses.join(' '), props.classAddControl)} id={props.Id} type={props.Type} placeholder={props.Placeholder} value={props.Value} onChange={props.OnChange} />
    }


    return (
        <React.Fragment>
            <div className={classNames(formGroupClasses.join(' '), props.classAddGroup)}>
                <label className={classNames(formNameClasses.join(' '), props.classAddName)} htmlFor={props.For}> { props.Label } </label>

                { typeControl(props.Control) }
            </div>
            {/* <span className="text-center"></span> */}
        </React.Fragment>
    )
}