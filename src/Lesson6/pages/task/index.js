import React from 'react';
import TextField from '@material-ui/core/TextField';
import style from './task.module.css'


export default
class extends React.Component{
    state = {
        inp:'',
        revInp:'',
        inp2:'',
        revInp2:'',
        inp3:'',
        happy:''
    };

    reverse = (e)=>{
       let a = e.target.value;
       this.setState({inp:a},()=>{
           let rev = '';
           for(let i of this.state.inp){
               if(i===i.toUpperCase()){
                   rev+=i.toLowerCase()
               }else {
                   rev+=i.toUpperCase()
               }
           }
           this.setState({revInp:rev})
       });

    };
    reverse2 = (e)=>{
        let a = e.target.value;
        this.setState({inp2:a},()=>{
            let rev = [];
            for(let i of this.state.inp2){
               rev.push(i)
            }
            this.setState({revInp2:rev.reverse()})
        });

    };
    isHappy = (e)=>{
        let a = e.target.value;
        if(a){
            if(+a||a==='0'){
                this.setState({inp3:a},()=>{
                    if(a.length%2!==0){
                        this.setState({happy:'need even num'});
                    }else {
                        let halfNum = 0;
                        let num = 0;
                        for(let i=0;i<a.length;i++){
                            if (i===a.length/2){
                                halfNum = num
                            }
                            num+=parseInt(a[i])
                        }
                        if(num/2===halfNum){
                            this.setState({happy:'you ticket is happy'});
                        }else{
                            this.setState({happy:'sorry you ticket is not happy'});
                        }
                    }
                })
            }else {
                this.setState({happy:'need a num'})
            }
        }else {
            this.setState({happy:'add a num'});
            this.setState({inp3:a})
        }
    };

    render(){
        return (
            <section className={style.task}>
                <div className={style.task1}>
                    <h2>Task#1</h2>
                    <TextField
                        id="outlined-basic"
                        label="Input for reverse case"
                        variant="outlined"
                        value={this.state.inp}
                        onChange={this.reverse}
                    />
                    <h3>Reversed input:<span>{this.state.revInp}</span></h3>
                </div>
                <div className={style.task2}>
                    <h2>Task#2</h2>
                    <TextField
                        id="outlined-basic"
                        label="Input for reverse"
                        variant="outlined"
                        value={this.state.inp2}
                        onChange={this.reverse2}
                    />
                    <h3>Reversed input:<span>{this.state.revInp2}</span></h3>
                </div>
                <div className={style.task3}>
                    <h2>Task#3</h2>
                    <TextField
                        id="outlined-basic"
                        label="Input num"
                        variant="outlined"
                        value={this.state.inp3}
                        onChange={this.isHappy}
                    />
                    <h3>Is Happy ticket:<span>{this.state.happy}</span></h3>
                </div>
            </section>
        )
    }
}