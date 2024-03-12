import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Swal from 'sweetalert2';

const MOCK_PRIMAOCI = [
    { id: 1, naziv: 'John Doe', brojRacuna: '265-0000001234569-78', pozivNaBroj: '12345', sifraPlacanja: '001', svrhaPlacanja: 'Donation' },
    { id: 2, naziv: 'Jane Doe', brojRacuna: '265-0000001234568-79', pozivNaBroj: '67890', sifraPlacanja: '002', svrhaPlacanja: 'Support' },
];


export const PrimaociPlacanja = () => {
    const [primaoci, setPrimaoci] = useState(MOCK_PRIMAOCI);

    const handleAdd = () => {
        Swal.fire({
            title: 'Add new recipient',
            html: `
                <input type="text" id="naziv" class="swal2-input" placeholder="Naziv">
                <input type="text" id="brojRacuna" class="swal2-input" placeholder="Broj racuna">
                <input type="text" id="pozivNaBroj" class="swal2-input" placeholder="Poziv na broj">
                <input type="text" id="sifraPlacanja" class="swal2-input" placeholder="Sifra placanja">
                <input type="text" id="svrhaPlacanja" class="swal2-input" placeholder="Svrha placanja">`,
            focusConfirm: false,
            preConfirm: () => {
                // @ts-ignore
                const naziv = document.getElementById('naziv').value;
                // @ts-ignore
                const brojRacuna = document.getElementById('brojRacuna').value;
                // @ts-ignore
                const pozivNaBroj = document.getElementById('pozivNaBroj').value;
                // @ts-ignore
                const sifraPlacanja = document.getElementById('sifraPlacanja').value;
                // @ts-ignore
                const svrhaPlacanja = document.getElementById('svrhaPlacanja').value;

                if (!naziv || !brojRacuna || !pozivNaBroj || !sifraPlacanja || !svrhaPlacanja) {
                    Swal.showValidationMessage(`Please fill in all fields.`);
                    return false;
                }
                return { naziv, brojRacuna, pozivNaBroj, sifraPlacanja, svrhaPlacanja };
            }
        }).then((result) => {
            if (result.value) {
                setPrimaoci(old => [...old, { id: Math.floor(Math.random() * 10000), ...result.value }]);
            }
        });
    };



    // @ts-ignore
    const handleEdit = (id) => {
        let recipientDetails = primaoci.find(rec => rec.id === id); // Find the recipient by ID
        // Provide a fallback if recipientDetails is undefined
        // @ts-ignore
        recipientDetails = recipientDetails || { naziv: '', brojRacuna: '', pozivNaBroj: '', sifraPlacanja: '', svrhaPlacanja: '' };

        Swal.fire({
            title: `Edit recipient with ID: ${id}`,
            html: `
                <input type="text" id="naziv" class="swal2-input" value="${
                // @ts-ignore
                recipientDetails.naziv}" placeholder="Naziv">
                <input type="text" id="brojRacuna" class="swal2-input" value="${
                // @ts-ignore
                recipientDetails.brojRacuna}" placeholder="Broj racuna">
                <input type="text" id="pozivNaBroj" class="swal2-input" value="${
                // @ts-ignore
                recipientDetails.pozivNaBroj}" placeholder="Poziv na broj">
                <input type="text" id="sifraPlacanja" class="swal2-input" value="${
                // @ts-ignore
                recipientDetails.sifraPlacanja}" placeholder="Sifra placanja">
                <input type="text" id="svrhaPlacanja" class="swal2-input" value="${
                // @ts-ignore
                recipientDetails.svrhaPlacanja}" placeholder="Svrha placanja">`,
            focusConfirm: false,
            preConfirm: () => {
                // @ts-ignore
                const naziv = document.getElementById('naziv').value;
                // @ts-ignore
                const brojRacuna = document.getElementById('brojRacuna').value;
                // @ts-ignore
                const pozivNaBroj = document.getElementById('pozivNaBroj').value;
                // @ts-ignore
                const sifraPlacanja = document.getElementById('sifraPlacanja').value;
                // @ts-ignore
                const svrhaPlacanja = document.getElementById('svrhaPlacanja').value;

                if (!naziv || !brojRacuna || !pozivNaBroj || !sifraPlacanja || !svrhaPlacanja) {
                    Swal.showValidationMessage(`Please fill in all fields.`);
                    return false;
                }
                return { naziv, brojRacuna, pozivNaBroj, sifraPlacanja, svrhaPlacanja };
            }
        }).then((result) => {
            if (result.value) {
                setPrimaoci(old => old.map(prim => (prim.id === id) ? { ...prim, ...result.value } : prim));
            }
        });
    };


    // @ts-ignore
    const handleDelete = (id) => {
        setPrimaoci(primaoci.filter(prim => prim.id !== id));
    };

    return (
        <Box>
            <Button variant="contained" onClick={handleAdd} sx={{ mb: 2 }}>
                Add New Recipient
            </Button>
            <List>
                {primaoci.map((recipient) => (
                    <ListItem
                        key={recipient.id}
                        secondaryAction={
                            <>
                                <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(recipient.id)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(recipient.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        }
                    >
                        <ListItemText
                            primary={recipient.naziv}
                            secondary={`Racun: ${recipient.brojRacuna}, PNB: ${recipient.pozivNaBroj}, SP: ${recipient.sifraPlacanja}, Svrh: ${recipient.svrhaPlacanja}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};
