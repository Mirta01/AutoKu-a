import { useParams } from "react-router-dom";
import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';
import './style.css';
import {Button, Form} from 'react-bootstrap'

function Create()
{
    const [vrsta, setVrsta] = useState('');
    const [tip, setTip] = useState('');
    const [model, setModel] = useState('');
    const [proizvodac, setProizvodac] = useState('');
    const [oznaka, setOznaka] = useState('');
    const [godina, setGodina] = useState('');
    const [snaga, setSnaga] = useState('');
    const [salon, setSalon] = useState('');

    return (
        <>
        <nav className="navbar navbar-light">
            <h3 className='navTitle'>VuV AUTOMOBILI</h3>
        </nav>

        <div className="formBody">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Vrsta vozila</Form.Label>
                    <Form.Select onChange={e => setVrsta(e.target.value)}>
                    <option>Automobil</option>
                    <option>Motocikl</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" onInput={e => setTip(e.target.value)}>
                    <Form.Label>Tip</Form.Label>
                    <Form.Control type="text"/>
                </Form.Group>

                <Form.Group className="mb-3" onInput={e => setModel(e.target.value)}>
                    <Form.Label>Model</Form.Label>
                    <Form.Control type="text"/>
                </Form.Group>

                <Form.Group className="mb-3" onInput={e => setProizvodac(e.target.value)}>
                    <Form.Label>Proizvođač</Form.Label>
                    <Form.Control type="text"/>
                </Form.Group>

                <Form.Group className="mb-3" onInput={e => setOznaka(e.target.value)}>
                    <Form.Label>Oznaka</Form.Label>
                    <Form.Control type="text"/>
                </Form.Group>
                
                <Form.Group className="mb-3" onInput={e => setGodina(e.target.value)}>
                    <Form.Label>Godina</Form.Label>
                    <Form.Control type="number"/>
                </Form.Group>

                <Form.Group className="mb-3" onInput={e => setSnaga(e.target.value)}>
                    <Form.Label>Snaga motora</Form.Label>
                    <Form.Control type="number"/>
                </Form.Group>

                <Form.Group className="mb-3" onInput={e => setSalon(e.target.value)}>
                    <Form.Label>Id salona</Form.Label>
                    <Form.Control type="number"/>
                </Form.Group>

                <Button
                variant="outline-primary"
                type="button"
                onClick={()=>{
                    axios({
                        method: 'post',
                        url: 'http://localhost:7000/create.php',
                            data: {
                                    vrsta: vrsta.toLowerCase(),
                                    tip: tip,
                                    model: model,
                                    proizvodac: proizvodac,
                                    oznaka: oznaka,
                                    godina: godina,
                                    snaga: snaga,
                                    salon: salon
                                },
                        headers: {"Content-Type": "multipart/form-data"},
                    }).then(function (response) {
                        window.location = "/";
                    }).catch(function (response){
                        console.log(response);
                    });
                }}>Spremi</Button>{' '}
            </Form>
        </div>
        </>
    )
}

export default Create;