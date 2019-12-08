import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as ArticlesModel from "../../api/makeRequest";
import DialogTitle from '@material-ui/core/DialogTitle';
import style from './auth.module.css'

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getButton: false,
            login: '',
            pass: '',
        }

    }

    getAuth() {
        let login = this.state.login;
        let pass = this.state.pass;

        ArticlesModel.getAuth(login, pass).then((e) => {
            if (e.error) {
                console.log(login);
                console.log(e.errText);
            } else {
                console.log(e.name, ' authorized');
                window.localStorage.setItem('token', e.token);
                window.localStorage.setItem('name', e.name);
                this.setState({login: ''});
                this.setState({pass: ''});
                this.setState({getButton:true})
            }

        })

    }
    getOut() {
        window.localStorage.setItem('token', '');
        window.localStorage.setItem('name', '');
        this.setState({getButton:false})
    }


    render() {
        let loginField =()=>{
            if(this.state.getButton&&window.localStorage.getItem('token')){
                return <DialogTitle id="form-dialog-title">
                    {`${window.localStorage.getItem('name')} - login`}
                    </DialogTitle>
            }else {
                return <>
                        <TextField
                            id="outlined-basic"
                            className={style.input}
                            label="Login"
                            margin="normal"
                            variant="outlined"
                            value={this.state.login}
                            onChange={(e) => {
                                this.setState({login: e.target.value})
                            }}
                        />
                        <TextField
                            id="outlined-basic"
                            className={style.input}
                            label="Password"
                            margin="normal"
                            variant="outlined"
                            value={this.state.pass}
                            onChange={(e) => {
                                this.setState({pass: e.target.value})
                            }}
                        />
                    </>
            }
        };


        return <form className={style.form} noValidate autoComplete="on">

                 {loginField()}
                <Button color='primary' disabled={this.state.getButton} onClick={() => {
                    this.getAuth()
                }}>
                    Ok
                </Button>
                <Button color='primary' disabled={!this.state.getButton} onClick={() => {
                    this.getOut()
                }}>
                    Out
                </Button>

        </form>
    }


}