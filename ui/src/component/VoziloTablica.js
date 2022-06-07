import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';
import './style.css';
import {Button, Table} from 'react-bootstrap'
import {BsFillTrashFill, BsFillPencilFill} from "react-icons/bs"

const baseURL = "http://localhost:7000/";

function VoziloTablica()
{
    const[vozilo, setVozilo]= useState([]);

    useEffect(() => {
        axios.get(baseURL + "read.php").then((response) => {
            setVozilo(response.data);
        });
    },[]);

    return (
        <>
        <nav className="navbar navbar-light">
            <h3 className='navTitle'>VuV AUTOMOBILI</h3>
            <div>
                <Button className='addBtn' variant="outline-dark">Dodaj</Button>{' '}

                <select id="narudbe">
                    <option value="all">Vozila</option>
                    <option value="ordered">Naručeni</option>
                    <option value="free">Slobodni</option>
                </select>
            </div>
        </nav>
        <Table striped bordered hover className='tableD'>
            <thead>
                <tr>
                    <th scope='col'>Šifra</th>
                    <th scope='col'>Vrsta</th>
                    <th scope='col'>Tip</th>
                    <th scope='col'>Model</th>
                    <th scope='col'>Proizvođač</th>
                    <th scope='col'>Oznaka</th>
                    <th scope='col'>Godina proizvodnje</th>
                    <th scope='col'>Snaga motora</th>
                    <th scope='col'>Salon</th>
                    <th scope='col'>Obriši</th>
                    <th scope='col'>Uredi</th>
                </tr>
            </thead>
            <tbody>
                {vozilo.map(x => {
                    return(<tr key = {x.sifra.toString()}>
                        <td>{x.sifra}</td>
                        <td>{x.vrsta}</td>
                        <td>{x.tip}</td>
                        <td>{x.model}</td>
                        <td>{x.proizvodac}</td>
                        <td>{x.oznaka}</td>
                        <td>{x.godina}. godina</td>
                        <td>{x.snaga} kW</td>
                        <td>{x.salon}</td>
                        <td onClick={() => {DeleteVehicle(x.sifra)}}><BsFillTrashFill/></td>
                        <td><BsFillPencilFill/></td>
                    </tr>)
                })}
            </tbody>
        </Table>
        </>
    )

    function DeleteVehicle(sifra) {
        axios.post(baseURL + "delete.php", {
            sifra: sifra
        },
        {
            headers : {
                "Content-Type": "multipart/form-data"
        }})
        .then(window.location.reload(false))
    }
}

export default VoziloTablica;