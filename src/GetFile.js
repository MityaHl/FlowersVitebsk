import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from "react-router-dom";

const fileDownload = require('react-file-download');

class GetFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            date: ''
        }
        this.takeFile = this.takeFile.bind(this);
        this.dateForFile = this.dateForFile.bind(this);
    }

    dateForFile(e) {
        this.setState({
            date: e.target.value
        })
    }

    takeFile() {
        axios.get('https://flora-vitebsk.herokuapp.com/getOrdersInExcel?date=' + this.state.date, { responseType: 'arraybuffer' })
             .then((response) => {
                 var blob = new Blob([response.data], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
                 fileDownload(blob, 
                         this.state.date ? (this.state.date.split('-').reverse().join('-') + '.xlsx') : ('file.xlsx')
                     );
                    
                this.setState({
                    redirect: true
                })                
             })
     }  
     render() {

        if (this.state.redirect) {
            return <Redirect to='/list'/>;
        }

         return (
             <div className="container">
                 <h5 htmlFor="name" className="get-file">Выбор даты (заказы с датой до выбранной будут занесены в файл):</h5>
                 <br/>
                <div className="row">
                    <input className="form-control col-8 ml-5px" name="house" value={this.state.date} type="date" onChange={this.dateForFile}/>
                    <button type="button" className="col-2 offset-1 btn btn-primary" onClick={this.takeFile}>
                        Получить файл
                    </button>
                </div>
                <br/>
                <p className="red-letters">Все сохраненные в файл заказы удалятся из списка заказов.</p>
                <p>В файл сохраняются заказы со статусом доставлен.</p>
             </div>
         )
     }
}

export default GetFile;