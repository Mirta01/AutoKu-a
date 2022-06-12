import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import {Button, Table, Dropdown} from 'react-bootstrap'
import {BsFillTrashFill, BsFillPencilFill} from "react-icons/bs"

const baseURL = "http://localhost:7000/";

function VoziloTablica()
{
    const[vozilo, setVozilo]= useState([]);
    const[status, setStatus]= useState([]);

    useEffect(() => {
        axios.get(baseURL + "read.php").then((response) => {
            setVozilo(response.data);
        });
    },[]);

    return (
        <>
        <nav className="navbar navbar-light">
            <h3 className='navTitle'>VuV AUTOMOBILI</h3>
            <div className='d-flex flex-direction-row'>
                <Link to={"/create"}>
                    <Button className='addBtn' variant="outline-dark">
                    Dodaj</Button>
                </Link>

                <Dropdown>
                    <Dropdown.Toggle className="selectBorder" variant="outline-dark" id="dropdown-basic"></Dropdown.Toggle>

                    <Dropdown.Menu onChange={e => setStatus(e.target.value)}>
                        <Dropdown.Item href="#/action-1">Vozila</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Naručeni</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Slobodni</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
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
                    <th scope='col' style={{width: '4%'}}>Obriši</th>
                    <th scope='col' style={{width: '4%'}}>Uredi</th>
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
                        <td>
                            <Link to={"/alter/"+x.sifra} className='text-dark'>
                                <BsFillPencilFill/>
                            </Link>
                        </td>
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