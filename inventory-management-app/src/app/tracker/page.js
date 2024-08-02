'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Button, Modal, TextField, Stack } from '@mui/material';
import { firestore } from '../../firebase'; // Adjust the import path if necessary
import { collection, doc, getDocs, setDoc, deleteDoc, getDoc } from 'firebase/firestore';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#ffffff', // Solid white background
  border: '2px solid #99181d', // Red border for consistency
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
  borderRadius: '15px', // Rounded corners to match the landing page
};

export default function Tracker() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const updateInventory = async () => {
    try {
      const snapshot = await getDocs(collection(firestore, 'inventory'));
      const inventoryList = snapshot.docs.map(doc => ({
        name: doc.id,
        ...doc.data()
      }));
      setInventory(inventoryList);
    } catch (error) {
      console.error("Error updating inventory: ", error);
    }
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const addItem = async (item) => {
    if (!item.trim()) return;

    try {
      const docRef = doc(collection(firestore, 'inventory'), item);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { quantity } = docSnap.data();
        await setDoc(docRef, { quantity: quantity + 1 });
      } else {
        await setDoc(docRef, { quantity: 1 });
      }
      await updateInventory();
    } catch (error) {
      console.error("Error adding item: ", error);
    }
  };

  const removeItem = async (item) => {
    try {
      const docRef = doc(collection(firestore, 'inventory'), item);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { quantity } = docSnap.data();
        if (quantity === 1) {
          await deleteDoc(docRef);
        } else {
          await setDoc(docRef, { quantity: quantity - 1 });
        }
      }
      await updateInventory();
    } catch (error) {
      console.error("Error removing item: ", error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #e6edf2, #f9d2d2)", // Subtle red gradient background
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontFamily: "'Lato', Arial, sans-serif" }}>
            Add Item
          </Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              sx={{ fontFamily: "'Lato', Arial, sans-serif" }}
            />
            <Button
              variant="outlined"
              sx={{ 
                borderColor: "#99181d", 
                color: "#99181d", 
                fontFamily: "'Lato', Arial, sans-serif",
                '&:hover': { 
                  borderColor: "#db4d52", 
                  color: "#db4d52" 
                } 
              }}
              onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button 
        variant="contained" 
        sx={{ 
          borderRadius: '20px', 
          bgcolor: "#99181d", 
          color: "#ffffff", 
          fontFamily: "'Lato', Arial, sans-serif", 
          '&:hover': { bgcolor: "#db4d52" } 
        }}
        onClick={handleOpen}
      >
        Add New Item
      </Button>
      <TextField
        id="search-bar"
        label="Search Items"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mt: 3, maxWidth: '800px', fontFamily: "'Lato', Arial, sans-serif" }}
      />
      <Box
        sx={{
          border: "1px solid #99181d", // Red border
          borderRadius: "15px", // Rounded corners
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Shadow for box
          overflow: "hidden", // Ensure content does not overflow
          width: "90%", // Set to 90% of the screen width
          maxWidth: "800px", // Maximum width
          mt: 3, // Margin top for spacing
        }}
      >
        <Box
          sx={{
            height: "80px",
            bgcolor: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderBottom: "1px solid #99181d",
          }}
        >
          <Typography variant="h2" color="#333" textAlign="center" sx={{ fontFamily: "'Lato', Arial, sans-serif" }}>
            Inventory Items
          </Typography>
        </Box>
        <Stack spacing={2} sx={{ maxHeight: "300px", overflowY: "auto", bgcolor: "#f0f0f0" }}>
          {filteredInventory.map(({ name, quantity }) => (
            <Box
              key={name}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 16px",
                borderBottom: "1px solid #ddd",
                fontFamily: "'Lato', Arial, sans-serif"
              }}
            >
              <Typography variant="h5" color="#333" sx={{ fontFamily: "'Lato', Arial, sans-serif" }}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant="h5" color="#333" sx={{ fontFamily: "'Lato', Arial, sans-serif" }}>
                Quantity: {quantity}
              </Typography>
              <Button 
                variant="contained" 
                sx={{ 
                  borderRadius: '10px', 
                  bgcolor: "#99181d", 
                  color: "#ffffff", 
                  fontFamily: "'Lato', Arial, sans-serif", 
                  '&:hover': { bgcolor: "#db4d52" } 
                }}
                onClick={() => removeItem(name)}
              >
                Remove
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
