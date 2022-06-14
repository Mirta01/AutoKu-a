import { useParams } from "react-router-dom";
import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';
import './style.css';
import {Button, Form} from 'react-bootstrap'

function Alter()
{
    let params = useParams();
    let voziloSifra  = params.sifra;

    const [vrsta, setVrsta] = useState('');
    const [tip, setTip] = useState('');
    const [model, setModel] = useState('');
    const [proizvodac, setProizvodac] = useState('');
    const [oznaka, setOznaka] = useState('');
    const [godina, setGodina] = useState('');
    const [snaga, setSnaga] = useState('');
    const [salon, setSalon] = useState('');


    useEffect(() => {
        getVozilo(voziloSifra);
    }, []);

    async function getVozilo(sifra)
    {
        try {
            const response = await axios.get('http://localhost:7000/read.php?sifra='+sifra);
            setVrsta(response.data[0].vrsta)
            setTip(response.data[0].tip)
            setModel(response.data[0].model)
            setProizvodac(response.data[0].proizvodac)
            setOznaka(response.data[0].oznaka)
            setGodina(response.data[0].godina)
            setSnaga(response.data[0].snaga)
            setSalon(response.data[0].salon)

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
        <nav className="navbar navbar-light">
            <h3 className='navTitle'>VuV AUTOMOBILI</h3>
        </nav>

        <div className="formBody">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Vrsta vozila</Form.Label>
                    <Form.Select aria-selected={vrsta.charAt(0).toUpperCase() + vrsta.slice(1)} onChange={e => setVrsta(e.target.value)} value={vrsta.charAt(0).toUpperCase() + vrsta.slice(1)} required >
                    <option>Automobil</option>
                    <option>Motocikl</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Tip</Form.Label>
                    <Form.Select onChange={e => setTip(e.target.value)} value={tip.charAt(0).toUpperCase() + tip.slice(1)} required>
                    {
                        vrsta.charAt(0).toUpperCase() + vrsta.slice(1) === "Automobil" ? <>
                            <option>Limuzina</option>
                            <option>Coupé</option>
                            <option>Kabriolet</option>
                            <option>Kombi</option>
                            <option>Crossover</option>
                            <option>Karavan</option>
                            <option>Terenski automobil</option>
                            <option>Sedan</option>
                            <option>Hatchback</option>
                        </>
                        : <></>
                    }
                    {
                        vrsta.charAt(0).toUpperCase() + vrsta.slice(1) === "Motocikl" ?
                        <>
                            <option>Choppere</option>
                            <option>Kruzer</option>
                            <option>Touring</option>
                            <option>Supermoto</option>
                            <option>Skuter</option>
                            <option>Off road</option>
                            <option>Criuser</option>
                            <option>Standard</option>
                        </>
                        : <></>
                    }
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" onInput={e => setModel(e.target.value)}>
                    <Form.Label>Model</Form.Label>
                    <Form.Control type="text" defaultValue={model}/>
                </Form.Group>

                <Form.Group className="mb-3" onInput={e => setProizvodac(e.target.value)}>
                    <Form.Label>Proizvođač</Form.Label>
                    <Form.Control type="text" defaultValue={proizvodac}/>
                </Form.Group>

                <Form.Group className="mb-3" onInput={e => setOznaka(e.target.value)}>
                    <Form.Label>Oznaka</Form.Label>
                    <Form.Control type="text" defaultValue={oznaka}/>
                </Form.Group>
                
                <Form.Group className="mb-3" onInput={e => setGodina(e.target.value)}>
                    <Form.Label>Godina</Form.Label>
                    <Form.Control type="number" defaultValue={godina}/>
                </Form.Group>

                <Form.Group className="mb-3" onInput={e => setSnaga(e.target.value)}>
                    <Form.Label>Snaga motora</Form.Label>
                    <Form.Control type="number" defaultValue={snaga}/>
                </Form.Group>

                <Form.Group className="mb-3" onInput={e => setSalon(e.target.value)}>
                    <Form.Label>Id salona</Form.Label>
                    <Form.Control type="number" defaultValue={salon}/>
                </Form.Group>

                <Button variant="outline-primary" type="button" onClick={() => {
                            axios({
                                method: 'post',
                                url: 'http://localhost:7000/alter.php',
                                data: {
                                    sifra: voziloSifra,
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

export default Alter;