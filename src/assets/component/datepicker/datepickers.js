import {TextField} from "@material-ui/core";
import React, {forwardRef} from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStylesDate= makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

function DatePickers(props,ref) {
    const classes = useStylesDate();

    return (
        <form className={classes.container} ref={ref} noValidate>
            <TextField
                id="date"
                label={props.label}
                type="date"
                defaultValue="2021-05-30"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }
                }
            />
        </form>
    );
}

const NewDatePickers=forwardRef(DatePickers);

export {NewDatePickers};