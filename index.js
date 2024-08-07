const express = require("express");
const mysql = require("mysql2");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const nodemailer = require('nodemailer');
const uuid = require('uuid');
const cron = require('node-cron');
const PORT = process.env.PORT || 8080;
const axios = require('axios');
const stripe = require('stripe')('sk_test_51LoS3iSGyKMMAZwstPlmLCEi1eBUy7MsjYxiKsD1lT31LQwvPZYPvqCdfgH9xl8KgeJoVn6EVPMgnMRsFInhnnnb00WhKhMOq7');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const QRCode = require('qrcode');
const fs = require('fs');

// URL Constants
const BASE_URL = 'https://kraftpoint.in/pg';
const SUCCESS_URL = `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&sender_id=`;
const CANCEL_URL = `${BASE_URL}/cancel`;
const TICKET_URL = `${BASE_URL}/tickets/`;
const DOCUMENT_URL = `${BASE_URL}/documents/`;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(session({
  key: "userId",
  secret: "Englishps4",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60 * 60 * 24 * 12,
  },
}));

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
}));


// Create a multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, path.join(__dirname, 'public', 'uploads'));
  },
  filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
      cb(null, true);
  } else {
      cb(new Error('Only images are allowed!'), false);
  }
};

// Create multer instance with the configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter
}).single('photo'); // 'photo' is the field name in the form



// Serve static files from the 'public' directory
app.use("/pg/", express.static(path.join(__dirname, 'public')));

const connection = mysql.createPool({
  connectionLimit: 10, // Maximum number of connections in the pool
  host: "localhost",
  user: "root",
  password: "Englishps#4",
  database: "whatsapp_pg",
});

connection.getConnection((err) => {
  if (err) {
    console.error("Error connecting to MySQL database: ", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

const userStates = {};

app.post('/pg/webhook', (req, res) => {
  console.log('Incoming POST request:', JSON.stringify(req.body, null, 2)); // Log incoming POST request payload

  try {
    if (req.body && req.body.entry && req.body.entry[0].changes && req.body.entry[0].changes[0].value.messages) {
      const message = req.body.entry[0].changes[0].value.messages[0];
      const senderId = message.from; // Assuming sender ID is provided in the request
      const messageType = message.type;

      if (messageType === 'text' || messageType === 'button') {
        const messageBody = messageType === 'text' ? message.text.body.toLowerCase() : message.button.payload.toLowerCase();

        if (!userStates[senderId]) {
          userStates[senderId] = { step: 0, data: {} };
        }

        const timestamp = new Date();

        if (messageBody === 'hi') {
          // Save the phone number to the database with conversation type and timestamp
          connection.query('INSERT INTO phone_numbers (phone_number, conversation_type, created_at) VALUES (?, ?, ?)',
            [senderId, 'greeting', timestamp, senderId, 'greeting', timestamp], (err, result) => {
              if (err) {
                console.error('Error saving phone number to database:', err);
              } else {
                console.log('Phone number saved to database');
              }
            });

          sendWhatsAppMessage({
            messaging_product: "whatsapp",
            to: senderId,
            type: "template",
            template: {
              name: "pg_temp_1", // Corrected template name
              language: { code: "en_US" }
            }
          });
        } else if (messageBody === 'room details') {
          connection.query('INSERT INTO phone_numbers (phone_number, conversation_type, created_at) VALUES (?, ?, ?)',
            [senderId, 'room details', timestamp, senderId, 'room details', timestamp], (err, result) => {
              if (err) {
                console.error('Error saving conversation to database:', err);
              } else {
                console.log('Conversation saved to database');
              }
            });

          sendWhatsAppMessage({
            messaging_product: "whatsapp",
            to: senderId,
            type: "template",
            template: {
              name: "pg_temp_2", // Corrected template name
              language: { code: "en_US" }
            }
          });
        } else if (messageBody === 'amenities') {
          connection.query('INSERT INTO phone_numbers (phone_number, conversation_type, created_at) VALUES (?, ?, ?)',
            [senderId, 'amenities', timestamp, senderId, 'amenities', timestamp], (err, result) => {
              if (err) {
                console.error('Error saving conversation to database:', err);
              } else {
                console.log('Conversation saved to database');
              }
            });

          sendWhatsAppMessage({
            messaging_product: "whatsapp",
            to: senderId,
            type: "template",
            template: {
              name: "amenities_pg_temp_3", // Corrected template name
              language: { code: "en_US" }
            }
          });
        } else if (messageBody === 'location and directions') {
          connection.query('INSERT INTO phone_numbers (phone_number, conversation_type, created_at) VALUES (?, ?, ?)',
            [senderId, 'location and directions', timestamp, senderId, 'location and directions', timestamp], (err, result) => {
              if (err) {
                console.error('Error saving conversation to database:', err);
              } else {
                console.log('Conversation saved to database');
              }
            });

          sendWhatsAppMessage({
            messaging_product: "whatsapp",
            to: senderId,
            type: "text",
            text: {
              body: "Hello! 😊 We're excited to welcome you to our PG. Here’s how to find us:\n\n*Address:*\nno 2, 15th main,\nVasanth Nagar,\nopposite to the shell petrol pump,\nBanglore 560001.\n\n*Directions:*\nFor your convenience, use this - https://maps.app.goo.gl/cX5LytoeHbkpDaUM6 - to get exact directions.\n\nIf you need any help finding us, just reply to this message or give us a call. We look forward to your stay!\n\nBest,\nLyxn Labs Team"
            }
          });
        } else if (messageBody === '1 sharing') {
          const buildings = ["Building 1", "Building 2", "Building 3"]; // Add your building names here
          let currentBuildingIndex = 0;
          let message = "";
        
          const fetchRoomDetails = async () => {
            const buildingName = buildings[currentBuildingIndex];
        
            try {
              // Fetch available beds in 1-sharing rooms for the specified building
              const bedResults = await new Promise((resolve, reject) => {
                connection.query(
                  `SELECT beds.bed_number, rooms.room_number, flats.flat_number, floors.floor_number 
                           FROM beds 
                           JOIN rooms ON beds.room_id = rooms.id 
                           JOIN flats ON rooms.flat_id = flats.id 
                           JOIN floors ON flats.floor_id = floors.id 
                           JOIN buildings ON floors.building_id = buildings.id 
                           WHERE beds.available = 0 AND rooms.sharing = 1 AND buildings.name = ?`,
                  [buildingName],
                  (err, results) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(results);
                    }
                  }
                );
              });
        
              if (bedResults.length > 0) {
                // Add building heading to the message
                message += `\n🏢 Building: ${buildingName} 🏢\n`;
        
                // Group beds by floor, flat, and room
                const groupedBeds = {};
                bedResults.forEach((bed) => {
                  const key = `${bed.floor_number}-${bed.flat_number}-${bed.room_number}`;
                  if (!groupedBeds[key]) {
                    groupedBeds[key] = [];
                  }
                  groupedBeds[key].push(bed.bed_number);
                });
        
                // Generate message with formatted room details
                Object.entries(groupedBeds).forEach(([room, beds]) => {
                  message += "Here are the available options:\n";
                  const [floor, flat, roomNumber] = room.split('-');
                  message += `🔹 Floor ${floor}, Flat ${flat}, Room ${roomNumber}:\n`;
                  beds.forEach((bed, index) => {
                    message += `  • Bed ${bed}\n`;
                  });
                  message += "\n";
                });
                } else {
                  // If no available rooms are found in the building, inform the user
                  message += `\n🏢 Building: ${buildingName} 🏢\n`;
                  message += `Sorry, there are no available 4-sharing rooms in ${buildingName} at the moment.\n\n`;
                }
        
              // Move to the next building
              currentBuildingIndex++;
        
              // If there are more buildings, fetch room details for the next building
              if (currentBuildingIndex < buildings.length) {
                await fetchRoomDetails();
              } else {
                // Send the constructed message after processing all buildings
                sendWhatsAppMessage({
                  messaging_product: "whatsapp",
                  to: senderId,
                  type: "text",
                  text: {
                    body: message
                  }
                });
              }
            } catch (error) {
              console.error('Error fetching room details:', error);
              sendWhatsAppMessage({
                messaging_product: "whatsapp",
                to: senderId,
                type: "text",
                text: {
                  body: "There was an error fetching the room details. Please try again later."
                }
              });
            }
          };
        
          // Save conversation to database and start fetching room details for the first building
          connection.query(
            'INSERT INTO phone_numbers (phone_number, conversation_type, created_at) VALUES (?, ?, ?)',
            [senderId, '1 sharing', timestamp],
            (err, result) => {
              if (err) {
                console.error('Error saving conversation to database:', err);
              } else {
                console.log('Conversation saved to database');
                // Start fetching room details for the first building
                fetchRoomDetails();
              }
            }
          );
        } else if (messageBody === '2 sharing') {
          const buildings = ["Building 1", "Building 2", "Building 3"]; // Add your building names here
          let currentBuildingIndex = 0;
          let message = "";

          const fetchRoomDetails = async () => {
            const buildingName = buildings[currentBuildingIndex];

            try {
              // Fetch available beds in 2-sharing rooms for the specified building
              const bedResults = await new Promise((resolve, reject) => {
                connection.query(
                  `SELECT beds.bed_number, rooms.room_number, flats.flat_number, floors.floor_number 
                         FROM beds 
                         JOIN rooms ON beds.room_id = rooms.id 
                         JOIN flats ON rooms.flat_id = flats.id 
                         JOIN floors ON flats.floor_id = floors.id 
                         JOIN buildings ON floors.building_id = buildings.id 
                         WHERE beds.available = 0 AND rooms.sharing = 2 AND buildings.name = ?`,
                  [buildingName],
                  (err, results) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(results);
                    }
                  }
                );
              });

              if (bedResults.length > 0) {
                // Add building heading to the message
                message += `\n🏢 Building: ${buildingName} 🏢\n`;

                // Group beds by floor, flat, and room
                const groupedBeds = {};
                bedResults.forEach((bed) => {
                  const key = `${bed.floor_number}-${bed.flat_number}-${bed.room_number}`;
                  if (!groupedBeds[key]) {
                    groupedBeds[key] = [];
                  }
                  groupedBeds[key].push(bed.bed_number);
                });

                // Generate message with formatted room details
                Object.entries(groupedBeds).forEach(([room, beds]) => {
                  message += "Here are the available options:\n";
                  const [floor, flat, roomNumber] = room.split('-');
                  message += `🔹 Floor ${floor}, Flat ${flat}, Room ${roomNumber}:\n`;
                  beds.forEach((bed, index) => {
                    message += `  • Bed ${bed}\n`;
                  });
                  message += "\n";
                });
                } else {
                  // If no available rooms are found in the building, inform the user
                  message += `\n🏢 Building: ${buildingName} 🏢\n`;
                  message += `Sorry, there are no available 4-sharing rooms in ${buildingName} at the moment.\n\n`;
                }
              // Move to the next building
              currentBuildingIndex++;

              // If there are more buildings, fetch room details for the next building
              if (currentBuildingIndex < buildings.length) {
                await fetchRoomDetails();
              } else {
                // Send the constructed message
                sendWhatsAppMessage({
                  messaging_product: "whatsapp",
                  to: senderId,
                  type: "text",
                  text: {
                    body: message
                  }
                });
              }
            } catch (error) {
              console.error('Error fetching room details:', error);
              sendWhatsAppMessage({
                messaging_product: "whatsapp",
                to: senderId,
                type: "text",
                text: {
                  body: "There was an error fetching the room details. Please try again later."
                }
              });
            }
          };

          // Save conversation to database and start fetching room details for the first building
          connection.query(
            'INSERT INTO phone_numbers (phone_number, conversation_type, created_at) VALUES (?, ?, ?)',
            [senderId, '2 sharing', timestamp],
            (err, result) => {
              if (err) {
                console.error('Error saving conversation to database:', err);
              } else {
                console.log('Conversation saved to database');
                // Start fetching room details for the first building
                fetchRoomDetails();
              }
            }
          );
        } else if (messageBody === '3 sharing') {
          const buildings = ["Building 1", "Building 2", "Building 3"]; // Add your building names here
          let currentBuildingIndex = 0;
          let message = "";

          const fetchRoomDetails = async () => {
            const buildingName = buildings[currentBuildingIndex];

            try {
              // Fetch available beds in 3-sharing rooms for the specified building
              const bedResults = await new Promise((resolve, reject) => {
                connection.query(
                  `SELECT beds.bed_number, rooms.room_number, flats.flat_number, floors.floor_number 
                      FROM beds 
                      JOIN rooms ON beds.room_id = rooms.id 
                      JOIN flats ON rooms.flat_id = flats.id 
                      JOIN floors ON flats.floor_id = floors.id 
                      JOIN buildings ON floors.building_id = buildings.id 
                      WHERE beds.available = 0 AND rooms.sharing = 3 AND buildings.name = ?`,
                  [buildingName],
                  (err, results) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(results);
                    }
                  }
                );
              });

              if (bedResults.length > 0) {
                // Add building heading to the message
                message += `\n🏢 Building: ${buildingName} 🏢\n`;

                // Group beds by floor, flat, and room
                const groupedBeds = {};
                bedResults.forEach((bed) => {
                  const key = `${bed.floor_number}-${bed.flat_number}-${bed.room_number}`;
                  if (!groupedBeds[key]) {
                    groupedBeds[key] = [];
                  }
                  groupedBeds[key].push(bed.bed_number);
                });

                // Generate message with formatted room details
                Object.entries(groupedBeds).forEach(([room, beds]) => {
                  message += "Here are the available options:\n";
                  const [floor, flat, roomNumber] = room.split('-');
                  message += `🔹 Floor ${floor}, Flat ${flat}, Room ${roomNumber}:\n`;
                  beds.forEach((bed, index) => {
                    message += `  • Bed ${bed}\n`;
                  });
                  message += "\n";
                });
                } else {
                  // If no available rooms are found in the building, inform the user
                  message += `\n🏢 Building: ${buildingName} 🏢\n`;
                  message += `Sorry, there are no available 4-sharing rooms in ${buildingName} at the moment.\n\n`;
                }
              // Move to the next building
              currentBuildingIndex++;

              // If there are more buildings, fetch room details for the next building
              if (currentBuildingIndex < buildings.length) {
                await fetchRoomDetails();
              } else {
                // Send the constructed message
                sendWhatsAppMessage({
                  messaging_product: "whatsapp",
                  to: senderId,
                  type: "text",
                  text: {
                    body: message
                  }
                });
              }
            } catch (error) {
              console.error('Error fetching room details:', error);
              sendWhatsAppMessage({
                messaging_product: "whatsapp",
                to: senderId,
                type: "text",
                text: {
                  body: "There was an error fetching the room details. Please try again later."
                }
              });
            }
          };

          // Save conversation to database and start fetching room details for the first building
          connection.query(
            'INSERT INTO phone_numbers (phone_number, conversation_type, created_at) VALUES (?, ?, ?)',
            [senderId, '3 sharing', timestamp],
            (err, result) => {
              if (err) {
                console.error('Error saving conversation to database:', err);
              } else {
                console.log('Conversation saved to database');
                // Start fetching room details for the first building
                fetchRoomDetails();
              }
            }
          );
        } else if (messageBody === '4 sharing') {
          const buildings = ["Building 1", "Building 2", "Building 3"]; // Add your building names here
          let currentBuildingIndex = 0;
          let message = "";

          const fetchRoomDetails = async () => {
            const buildingName = buildings[currentBuildingIndex];

            try {
              // Fetch available beds in 4-sharing rooms for the specified building
              const bedResults = await new Promise((resolve, reject) => {
                connection.query(
                  `SELECT beds.bed_number, rooms.room_number, flats.flat_number, floors.floor_number 
                  FROM beds 
                  JOIN rooms ON beds.room_id = rooms.id 
                  JOIN flats ON rooms.flat_id = flats.id 
                  JOIN floors ON flats.floor_id = floors.id 
                  JOIN buildings ON floors.building_id = buildings.id 
                  WHERE beds.available = 0 AND rooms.sharing = 4 AND buildings.name = ?`,
                  [buildingName],
                  (err, results) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(results);
                    }
                  }
                );
              });

              if (bedResults.length > 0) {
                // Add building heading to the message
                message += `\n🏢 Building: ${buildingName} 🏢\n`;

                // Group beds by floor, flat, and room
                const groupedBeds = {};
                bedResults.forEach((bed) => {
                  const key = `${bed.floor_number}-${bed.flat_number}-${bed.room_number}`;
                  if (!groupedBeds[key]) {
                    groupedBeds[key] = [];
                  }
                  groupedBeds[key].push(bed.bed_number);
                });

                // Generate message with formatted room details
                Object.entries(groupedBeds).forEach(([room, beds]) => {
                  message += "Here are the available options:\n";
                  const [floor, flat, roomNumber] = room.split('-');
                  message += `🔹 Floor ${floor}, Flat ${flat}, Room ${roomNumber}:\n`;
                  beds.forEach((bed, index) => {
                    message += `  • Bed ${bed}\n`;
                  });
                  message += "\n";
                });
                } else {
                  // If no available rooms are found in the building, inform the user
                  message += `\n🏢 Building: ${buildingName} 🏢\n`;
                  message += `Sorry, there are no available 4-sharing rooms in ${buildingName} at the moment.\n\n`;
                }

              // Move to the next building
              currentBuildingIndex++;

              // If there are more buildings, fetch room details for the next building
              if (currentBuildingIndex < buildings.length) {
                await fetchRoomDetails();
              } else {
                // Send the constructed message
                sendWhatsAppMessage({
                  messaging_product: "whatsapp",
                  to: senderId,
                  type: "text",
                  text: {
                    body: message
                  }
                });
              }
            } catch (error) {
              console.error('Error fetching room details:', error);
              sendWhatsAppMessage({
                messaging_product: "whatsapp",
                to: senderId,
                type: "text",
                text: {
                  body: "There was an error fetching the room details. Please try again later."
                }
              });
            }
          };

          // Save conversation to database and start fetching room details for the first building
          connection.query(
            'INSERT INTO phone_numbers (phone_number, conversation_type, created_at) VALUES (?, ?, ?)',
            [senderId, '4 sharing', timestamp],
            (err, result) => {
              if (err) {
                console.error('Error saving conversation to database:', err);
              } else {
                console.log('Conversation saved to database');
                // Start fetching room details for the first building
                fetchRoomDetails();
              }
            }
          );
        } else if (messageBody === 'check availability') {
          const checkAvailability = async () => {
            try {
              // Fetch available beds
              const bedResults = await new Promise((resolve, reject) => {
                connection.query('SELECT * FROM beds WHERE available = 0', (err, results) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(results);
                  }
                });
              });

              // Initialize counters for each sharing value
              let sharingCounts = { 1: 0, 2: 0, 3: 0, 4: 0 };

              // Iterate through available beds
              for (const bed of bedResults) {
                // Fetch room sharing value for the bed
                const roomResults = await new Promise((resolve, reject) => {
                  connection.query('SELECT sharing FROM rooms WHERE id = ?', [bed.room_id], (err, results) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(results);
                    }
                  });
                });

                // Increment the corresponding sharing count
                if (roomResults.length > 0) {
                  const sharing = roomResults[0].sharing;
                  sharingCounts[sharing]++;
                }
              }

              // Send a template message with the availability counts
              const availabilityMessage = `*Hey there!* Here's the current availability of beds for you:\n\n *1 Sharing Rooms:* ${sharingCounts[1]} beds available\n *2 Sharing Rooms:* ${sharingCounts[2]} beds available\n *3 Sharing Rooms:* ${sharingCounts[3]} beds available\n *4 Sharing Rooms:* ${sharingCounts[4]} beds available`;
              sendWhatsAppMessage({
                messaging_product: "whatsapp",
                to: senderId,
                type: "template",
                template: {
                  name: "temp_6_pg", // Template name
                  language: { code: "en_US" }
                }
              });
            } catch (error) {
              console.error('Error fetching availability:', error);
            }
          };

          checkAvailability();
        } else if (messageBody === 'advance booking') {
          connection.query('INSERT INTO phone_numbers (phone_number, conversation_type, created_at) VALUES (?, ?, ?)',
            [senderId, 'advance booking', timestamp, senderId, 'advance booking', timestamp], (err, result) => {
              if (err) {
                console.error('Error saving conversation to database:', err);
              } else {
                console.log('Conversation saved to database');
              }
            });

          // Create a Stripe checkout session
          stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
              price_data: {
                currency: 'inr',
                product_data: {
                  name: 'Advance Booking',
                },
                unit_amount: 300000, // ₹3000.00
              },
              quantity: 1,
            }],
            mode: 'payment',
            success_url: `${SUCCESS_URL}${senderId}`,
            cancel_url: CANCEL_URL,
          }).then(session => {
            sendWhatsAppMessage({
              messaging_product: "whatsapp",
              to: senderId,
              type: "text",
              text: {
                body: `Please complete your payment using the following link:\n${session.url}`
              }
            });
          }).catch(err => {
            console.error('Error creating Stripe session:', err);
            sendWhatsAppMessage({
              messaging_product: "whatsapp",
              to: senderId,
              type: "text",
              text: {
                body: "Sorry, there was an error processing your payment. Please try again later."
              }
            });
          });
        } else {
          sendWhatsAppMessage({
            messaging_product: "whatsapp",
            to: senderId,
            type: "text",
            text: {
              body: "Sorry, I didn't understand that. Please type 'hi' for assistance."
            }
          });
        }
      }
    }

    res.sendStatus(200); // Respond to the webhook POST request
  } catch (error) {
    console.error('Error processing the webhook:', error);
    res.sendStatus(500); // Internal Server Error
  }
});


async function handlePaymentSuccess(sessionId, senderId) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    const ticketDetails = {
      ticketId: session.id,
      amount: session.amount_total,
      currency: session.currency,
      customerEmail: session.customer_details.email,
      senderId: senderId,
    };

    await connection.execute('INSERT INTO advance_ticket (ticket_id, amount, currency, customer_email, sender_id) VALUES (?, ?, ?, ?, ?)', [ticketDetails.ticketId, ticketDetails.amount, ticketDetails.currency, ticketDetails.customerEmail, ticketDetails.senderId]);

    const pdfBytes = await generateTicketPDF(ticketDetails);
    const filePath = path.join(__dirname, 'public', 'tickets', `${ticketDetails.ticketId}.pdf`);
    fs.writeFileSync(filePath, pdfBytes);

    sendWhatsAppMessage({
      messaging_product: "whatsapp",
      to: senderId,
      type: "document",
      document: {
        link: `${TICKET_URL}${ticketDetails.ticketId}.pdf`,
        caption: 'Here is your advance booking recipt.'
      }
    });
  } catch (error) {
    console.error('Error in handlePaymentSuccess:', error);
  }
}

async function generateTicketPDF(ticketDetails) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([500, 500]);

  const { width, height } = page.getSize();
  const fontSize = 18;
  const text = `Ticket ID: ${ticketDetails.ticketId}\nAmount: ${ticketDetails.amount / 100}\nCustomer Email: ${ticketDetails.customerEmail}`;

  const qrCode = await QRCode.toDataURL(JSON.stringify(ticketDetails));

  const qrImage = await pdfDoc.embedPng(qrCode);
  const qrDims = qrImage.scale(0.5);

  // Center the QR code at the top
  page.drawImage(qrImage, {
    x: (width - qrDims.width) / 2,
    y: height - qrDims.height - 50,
    width: qrDims.width,
    height: qrDims.height
  });

  // Position the text below the QR code
  const textX = 50;
  const textY = height - qrDims.height - 100;

  page.drawText(text, {
    x: textX,
    y: textY,
    size: fontSize,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
    lineHeight: fontSize + 4
  });

  return await pdfDoc.save();
}

app.post('/pg/api/send-whatsapp-reminder', async (req, res) => {
  const { remniderMember, message } = req.body;

  const data = {
    messaging_product: "whatsapp",
    to: `91${remniderMember}`,
    type: "text",
    text: { body: message }
  };

  try {
    const response = await sendWhatsAppMessage(data);
    res.status(200).json({ message: 'Message sent successfully', data: response.data });
  } catch (error) {
    if (error.response && error.response.data) {
      console.error('Error sending message:', error.response.data);
      res.status(500).json({ message: 'Error sending message', error: error.response.data });
    } else {
      console.error('Error sending message:', error.message);
      res.status(500).json({ message: 'Error sending message', error: error.message });
    }
  }
});

// Function to send WhatsApp message
function sendWhatsAppMessage(data) {
  const config = {
    headers: {
      'Authorization': 'Bearer EAAFsUoRPg1QBOzpnPGEpxBDKEw93j35D2V0Qg5C8O58FNQZAxWXWMo0XJZB6ezMoUWY6xNC6AhPGUZCjt0w8AJwuyAfkhjnZAn73tOU88pXhTxAJevtKm1GSGkDFwh5y79N1eX9LWhD3ceZAZBr36MDd1fgAy0mP9UfVDIugUDGxcl64vAhpNuj7FkbG36HGJn3RQus1iw92DiNn4w',
      'Content-Type': 'application/json'
    }
  };

  axios.post('https://graph.facebook.com/v19.0/332700683252247/messages', data, config)
    .then(response => {
      console.log('Message sent successfully:', response.data);
    })
    .catch(error => {
      console.error('Error sending message:', error.response.data);
    });
}

// Webhook verification endpoint (GET request)
const VERIFY_TOKEN = 'EAAFsUoRPg1QBOzpnPGEpxBDKEw93j35D2V0Qg5C8O58FNQZAxWXWMo0XJZB6ezMoUWY6xNC6AhPGUZCjt0w8AJwuyAfkhjnZAn73tOU88pXhTxAJevtKm1GSGkDFwh5y79N1eX9LWhD3ceZAZBr36MDd1fgAy0mP9UfVDIugUDGxcl64vAhpNuj7FkbG36HGJn3RQus1iw92DiNn4w';

app.get('/pg/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(400);
    }
});



// GET endpoint for testing
app.get('/pg/', (req, res) => {
  res.send('Welcome to the Facebook Messenger webhook!');
});

// Success endpoint to handle successful payments
app.get('/pg/success', async (req, res) => {
  const sessionId = req.query.session_id;
  const senderId = req.query.sender_id;
  if (!sessionId || !senderId) {
    return res.status(400).send('Missing session_id or sender_id');
  }
  try {
    await handlePaymentSuccess(sessionId, senderId);
    res.send('Payment successful! Your recipt has been sent to your WhatsApp.');
  } catch (error) {
    console.error('Error handling payment success:', error);
    res.status(500).send('An error occurred while processing your payment.');
  }
});


/*Admin Panel code*/

app.post('/pg/addUser', (req, res) => {
  const {
    phone_no,
    email,
    password,
    Name,
    Position,
    gender,
    Role
  } = req.body;


  const randomString = uuid.v4().replace(/-/g, '').substr(0, 8);

  // Check if the email already exists in the database
  const checkEmailQuery = 'SELECT * FROM admins WHERE email = ?';
  connection.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      console.error('Error checking email:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else if (results.length > 0) {
      // If email already exists, return a message
      res.status(409).json({ error: 'User with this email already exists' });
    } else {
      // If email doesn't exist, proceed with user registration
      bcrypt.hash(password, saltRounds, (hashErr, hash) => {
        if (hashErr) {
          console.error('Error hashing password: ', hashErr);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          const insertQuery =
            'INSERT INTO admins (email, password) VALUES (?, ?)';
          const values = [
            email,
            hash,
          ];

          connection.query(insertQuery, values, (insertErr, insertResults) => {
            if (insertErr) {
              console.error('Error inserting user: ', insertErr);
              res.status(500).json({ error: 'Internal server error' });
            } else {
              console.log('User registration successful!');
              res.sendStatus(200);
            }
          });
        }
      });
    }
  });
});

const verifyjwt = (req, res) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.send("no token unsuccessfull");
  } else {
    jwt.verify(token, "jwtsecret", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "u have failed to auth" });
      } else {
        req.user_id = decoded.id;
      }
    });
  }
};

app.get("/pg/userAuth", verifyjwt, (req, res) => { });

app.get("/pg/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/pg/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  connection.query(
    "SELECT * FROM admins WHERE email = ?",
    email,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            const id = result[0].id;
            const token = jwt.sign({ id }, "jwtsecret", {
              expiresIn: 86400,
            });

            connection.query(
              `update admins set jwt = "${token}" where email = "${email}" `,
              (err, result) => {
                if (err) console.log(err);
                console.log(result);
              }
            );
            req.session.user = result;
            res.json({ auth: true, token: token, result: result });
          } else {
            res.json({ auth: false, message: "Email or password is wrong" });
          }
        });
      } else {
        res.json({ auth: false, message: "User does not exist" });
      }
    }
  );
});

app.put('/pg/edit/member/:memberId', (req, res) => {
  const memberId = req.params.memberId;
  const { name, phoneNo, bedId } = req.body;

  // Fetch current bed_id of the member
  connection.query('SELECT bed_id FROM members WHERE member_id = ?', [memberId], (err, results) => {
    if (err) {
      console.error('Error fetching current bed_id:', err);
      return res.status(500).send('Error fetching current bed_id');
    }

    if (results.length === 0) {
      console.error('No member found with the specified member_id:', memberId);
      return res.status(404).send('No member found with the specified member_id');
    }

    const currentBedId = results[0].bed_id;

    // Update previous bed availability to 0
    connection.query('UPDATE beds SET available = 0 WHERE id = ?', [currentBedId], (err, results) => {
      if (err) {
        console.error('Error updating previous bed availability:', err);
        return res.status(500).send('Error updating previous bed availability');
      }

      // Update member details with new name, phoneNo, and bedId
      connection.query('UPDATE members SET name = ?, phoneno = ?, bed_id = ? WHERE member_id = ?', [name, phoneNo, bedId, memberId], (err, results) => {
        if (err) {
          console.error('Error updating member details:', err);
          return res.status(500).send('Error updating member details');
        }

        if (results.affectedRows === 0) {
          console.error('No member found with the specified member_id:', memberId);
          return res.status(404).send('No member found with the specified member_id');
        }

        // Update new bed availability to 1
        connection.query('UPDATE beds SET available = 1 WHERE id = ?', [bedId], (err, results) => {
          if (err) {
            console.error('Error updating new bed availability:', err);
            return res.status(500).send('Error updating new bed availability');
          }

          res.status(200).send('Member details updated successfully');
        });
      });
    });
  });
});

app.get('/pg/display/members', (req, res) => {
  const membersQuery = 'SELECT * FROM members WHERE active = 1';

  connection.query(membersQuery, (err, membersResults) => {
    if (err) {
      console.error('Error fetching members:', err);
      res.status(500).send('Server error');
      return;
    }

    if (membersResults.length === 0) {
      res.json([]);
      return;
    }

    const membersWithDetails = [];
    let processedMembers = 0;

    membersResults.forEach((member) => {
      const bedQuery = 'SELECT * FROM beds WHERE id = ?';
      connection.query(bedQuery, [member.bed_id], (err, bedResults) => {
        if (err) {
          console.error('Error fetching bed:', err);
          res.status(500).send('Server error');
          return;
        }

        if (bedResults.length === 0) {
          console.error(`Bed not found for bed_id: ${member.bed_id}`);
          processedMembers++;
          checkAllMembersProcessed();
          return;
        }

        const bed = bedResults[0];
        const roomQuery = 'SELECT * FROM rooms WHERE id = ?';
        connection.query(roomQuery, [bed.room_id], (err, roomResults) => {
          if (err) {
            console.error('Error fetching room:', err);
            res.status(500).send('Server error');
            return;
          }

          if (roomResults.length === 0) {
            console.error(`Room not found for room_id: ${bed.room_id}`);
            processedMembers++;
            checkAllMembersProcessed();
            return;
          }

          const room = roomResults[0];
          const flatQuery = 'SELECT * FROM flats WHERE id = ?';
          connection.query(flatQuery, [room.flat_id], (err, flatResults) => {
            if (err) {
              console.error('Error fetching flat:', err);
              res.status(500).send('Server error');
              return;
            }

            if (flatResults.length === 0) {
              console.error(`Flat not found for flat_id: ${room.flat_id}`);
              processedMembers++;
              checkAllMembersProcessed();
              return;
            }

            const flat = flatResults[0];
            const floorQuery = 'SELECT * FROM floors WHERE id = ?';
            connection.query(floorQuery, [flat.floor_id], (err, floorResults) => {
              if (err) {
                console.error('Error fetching floor:', err);
                res.status(500).send('Server error');
                return;
              }

              if (floorResults.length === 0) {
                console.error(`Floor not found for floor_id: ${flat.floor_id}`);
                processedMembers++;
                checkAllMembersProcessed();
                return;
              }

              const floor = floorResults[0];
              const buildingQuery = 'SELECT * FROM buildings WHERE id = ?';
              connection.query(buildingQuery, [floor.building_id], (err, buildingResults) => {
                if (err) {
                  console.error('Error fetching building:', err);
                  res.status(500).send('Server error');
                  return;
                }

                if (buildingResults.length === 0) {
                  console.error(`Building not found for building_id: ${floor.building_id}`);
                  processedMembers++;
                  checkAllMembersProcessed();
                  return;
                }

                const building = buildingResults[0];
                const memberDetails = {
                  ...member,
                  bed,
                  room,
                  flat,
                  floor,
                  building
                };

                membersWithDetails.push(memberDetails);
                processedMembers++;
                checkAllMembersProcessed();
              });
            });
          });
        });
      });
    });

    function checkAllMembersProcessed() {
      if (processedMembers === membersResults.length) {
        res.json(membersWithDetails);
      }
    }
  });
});


app.get('/pg/api/vacancies', (req, res) => {
  const vacancies = { '1 sharing': 0, '2 sharing': 0, '3 sharing': 0, '4 sharing': 0 };

  // Query to count vacancies for each sharing type
  const vacancyQuery = `
    SELECT sharing, COUNT(*) AS count
    FROM beds b
    JOIN rooms r ON b.room_id = r.id
    WHERE b.available = 0
    GROUP BY sharing
  `;

  connection.query(vacancyQuery, (err, results) => {
    if (err) {
      console.error('Error fetching vacancies:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Update the vacancies object with counts for each sharing type
    results.forEach(row => {
      vacancies[`${row.sharing} sharing`] = row.count;
    });

    res.json(vacancies);
  });
});

app.get('/pg/advance_tickets', (req, res) => {
  const query = 'SELECT * FROM advance_ticket';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying database: ', err);
      res.status(500).json({ error: 'Error querying database' });
      return;
    }
    res.json(results);
  });
});


app.get('/pg/api/phone-numbers', (req, res) => {
  const query = 'SELECT * FROM phone_numbers';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching phone numbers:', err);
      res.status(500).send('Error fetching phone numbers');
      return;
    }

    res.json(results);
  });
});
app.post('/pg/addMembers', (req, res) => {
  const { name, phoneNo, bedId, dateJoining, dateLeaving, workingLocation, adharNumber, costing, alternativeNumber } = req.body;

  const addMemberQuery = `
    INSERT INTO members (name, phoneno, bed_id, date_join, date_leaving, working_location, adhar, costing, alternative_numbers, active)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
  `;
  
  connection.query(addMemberQuery, [name, phoneNo, bedId, dateJoining, dateLeaving, workingLocation, adharNumber, costing, alternativeNumber], (err, results) => {
    if (err) {
      console.error('Error inserting member:', err);
      return res.status(500).send(err);
    }

    // Update the availability of the bed
    const updateBedQuery = 'UPDATE beds SET available = 1 WHERE id = ?';
    connection.query(updateBedQuery, [bedId], (err, results) => {
      if (err) {
        console.error('Error updating bed availability:', err);
        return res.status(500).send(err);
      }
      res.send('Member added successfully and bed updated');
    });
  });
});

app.get('/pg/beds/:sharing', (req, res) => {
  const sharing = req.params.sharing;

  connection.query(`
    SELECT 
      beds.id AS bedId, 
      beds.bed_number,
      rooms.room_number,
      flats.flat_number,
      floors.floor_number,
      buildings.name AS buildingName
    FROM beds
    JOIN rooms ON beds.room_id = rooms.id
    JOIN flats ON rooms.flat_id = flats.id
    JOIN floors ON flats.floor_id = floors.id
    JOIN buildings ON floors.building_id = buildings.id
    WHERE beds.available = 0 AND rooms.sharing = ?
  `, [sharing], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.put('/pg/api/updateMember/:id', (req, res) => {
  const memberId = req.params.id;

  const sqlUpdateMember = 'UPDATE members SET active = ? WHERE member_id = ?';
  const valuesUpdateMember = [false, memberId];

  const sqlFetchBedId = 'SELECT bed_id FROM members WHERE member_id = ?';
  const sqlUpdateBedAvailability = 'UPDATE beds SET available = ? WHERE id = ?';

  connection.query(sqlUpdateMember, valuesUpdateMember, (err, result) => {
    if (err) {
      console.error('Error updating member:', err);
      res.status(500).json({ error: 'Error updating member' });
      return;
    }

    connection.query(sqlFetchBedId, [memberId], (err, rows) => {
      if (err) {
        console.error('Error fetching bed id:', err);
        res.status(500).json({ error: 'Error updating member' });
        return;
      }

      if (rows.length === 0) {
        console.error('No bed found for member:', memberId);
        res.status(404).json({ error: 'No bed found for member' });
        return;
      }

      const bedId = rows[0].bed_id;

      connection.query(sqlUpdateBedAvailability, [0, bedId], (err, result) => {
        if (err) {
          console.error('Error updating bed availability:', err);
          res.status(500).json({ error: 'Error updating member' });
          return;
        }

        console.log('Member and bed updated successfully');
        res.status(200).json({ message: 'Member deactivated successfully' });
      });
    });
  });
});

// Cron job to check and deactivate members based on date_vacating
cron.schedule('*/30 * * * * *', () => {
  const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format

  const sqlSelectMembersToDeactivate = 'SELECT member_id FROM vacating_members WHERE date_vacating = ?';
  connection.query(sqlSelectMembersToDeactivate, [today], (err, rows) => {
    if (err) {
      console.error('Error selecting members to deactivate:', err);
      return;
    }

    rows.forEach((row) => {
      const memberId = row.member_id;
      
      // Call the API to deactivate member
      const apiUrl = `${BASE_URL}/api/updateMember/${memberId}`;
      fetch(apiUrl, { method: 'PUT' })
        .then(response => {
          if (!response.ok) {
            console.error(`Failed to deactivate member ${memberId}`);
          }
        })
        .catch(error => {
          console.error(`Error deactivating member ${memberId}:`, error);
        });
    });
  });
});

// Endpoint to fetch all members
app.get('/pg/api/members', (req, res) => {
  connection.getConnection((err, connection) => {
      if (err) {
          console.error('Error connecting to database:', err);
          res.status(500).json({ error: 'Database connection error' });
          return;
      }

      connection.query('SELECT * FROM members', (error, results, fields) => {
          connection.release();

          if (error) {
              console.error('Error executing query:', error);
              res.status(500).json({ error: 'Query execution error' });
              return;
          }

          res.json(results);
      });
  });
});

app.get('/pg/api/total-rent', (req, res) => {
  connection.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      res.status(500).json({ error: 'Database connection error' });
      return;
    }

    // Query to calculate total rent based on costing column for active members
    const query = `
      SELECT SUM(costing) AS totalRent 
      FROM members 
      WHERE active = 1
    `;

    connection.query(query, (error, results, fields) => {
      connection.release(); // Release the connection back to the pool

      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Query execution error' });
        return;
      }

      // Extract total rent from results
      const totalRent = results[0].totalRent || 0;
      res.json({ totalRent }); // Return totalRent as JSON object
    });
  });
});
// Endpoint to fetch members leaving this month
app.get('/pg/api/leaving-members', (req, res) => {
  connection.getConnection((err, connection) => {
      if (err) {
          console.error('Error connecting to database:', err);
          res.status(500).json({ error: 'Database connection error' });
          return;
      }

      connection.query('SELECT * FROM members WHERE MONTH(date_leaving) = MONTH(CURDATE()) AND YEAR(date_leaving) = YEAR(CURDATE())', (error, results, fields) => {
          connection.release();

          if (error) {
              console.error('Error executing query:', error);
              res.status(500).json({ error: 'Query execution error' });
              return;
          }

          res.json(results);
      });
  });
});

// Endpoint to fetch members with rent not paid this month
app.get('/pg/api/rent-not-paid', (req, res) => {
  connection.getConnection((err, connection) => {
      if (err) {
          console.error('Error connecting to database:', err);
          res.status(500).json({ error: 'Database connection error' });
          return;
      }

      connection.query('SELECT * FROM members WHERE payment_pending = 1', (error, results, fields) => {
          connection.release();

          if (error) {
              console.error('Error executing query:', error);
              res.status(500).json({ error: 'Query execution error' });
              return;
          }

          res.json(results);
      });
  });
});

// Endpoint to fetch upcoming joining members
app.get('/pg/api/joining-members', (req, res) => {
  connection.getConnection((err, connection) => {
      if (err) {
          console.error('Error connecting to database:', err);
          res.status(500).json({ error: 'Database connection error' });
          return;
      }

      connection.query('SELECT * FROM members WHERE date_join > CURDATE()', (error, results, fields) => {
          connection.release();

          if (error) {
              console.error('Error executing query:', error);
              res.status(500).json({ error: 'Query execution error' });
              return;
          }

          res.json(results);
      });
  });
});

// API Endpoint to update rent payment status
app.put('/pg/api/mark-rent-paid/:id', (req, res) => {
  const memberId = req.params.id;
  const { payment_pending } = req.body; // Assuming 'payment_pending' is sent in the request body

  const sql = 'UPDATE members SET payment_pending = ? WHERE member_id = ?';
  connection.query(sql, [payment_pending, memberId], (err, result) => {
    if (err) {
      console.error('Error updating rent payment status:', err);
      res.status(500).json({ error: 'Failed to update rent payment status' });
      return;
    }
    console.log(`Rent payment status updated for member ID ${memberId}`);
    res.status(200).json({ message: 'Rent payment status updated successfully' });
  });
});

app.get('/pg/api/members-paid-rent', async (req, res) => {
  connection.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err);
        res.status(500).json({ error: 'Database connection error' });
        return;
    }

    connection.query('SELECT * FROM members WHERE payment_pending = 0', (error, results, fields) => {
        connection.release();

        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Query execution error' });
            return;
        }

        res.json(results);
    });
});
});

// API Endpoint to update rent payment status
app.put('/pg/api/mark-rent-not-paid/:id', (req, res) => {
  const memberId = req.params.id;
  const { payment_pending } = req.body; // Assuming 'payment_pending' is sent in the request body

  const sql = 'UPDATE members SET payment_pending = ? WHERE member_id = ?';
  connection.query(sql, [payment_pending, memberId], (err, result) => {
    if (err) {
      console.error('Error updating rent payment status:', err);
      res.status(500).json({ error: 'Failed to update rent payment status' });
      return;
    }
    console.log(`Rent payment status updated for member ID ${memberId}`);
    res.status(200).json({ message: 'Rent payment status updated successfully' });
  });
});


app.get('/pg/api/vacating-members', (req, res) => {
  const query = `
    SELECT m.*, vm.date_vacating
    FROM vacating_members vm
    JOIN members m ON vm.member_id = m.member_id
    WHERE m.active = 1
  `;
  
  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
});


app.delete('/pg/api/vacating-members/:id', (req, res) => {
  const { id } = req.params;
  const query = `
    DELETE FROM vacating_members
    WHERE member_id = ?
  `;
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error removing vacating member:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json({ message: 'Vacating member removed successfully' });
    }
  });
});

// API route to insert into vacating_members with duplication check
app.post('/pg/api/insertVacatingMember/:id', (req, res) => {
  const memberId = req.params.id;
  const { deletionDate } = req.body;

  // Check if there's already an entry for the member with the same deletion date
  const sqlCheckDuplicate = 'SELECT * FROM vacating_members WHERE member_id = ? AND date_vacating = ?';
  connection.query(sqlCheckDuplicate, [memberId, deletionDate], (err, rows) => {
    if (err) {
      console.error('Error checking duplicate entry:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (rows.length > 0) {
      // If a duplicate entry exists
      console.log('Duplicate entry found');
      res.status(409).json({ error: 'Duplicate entry found' }); // Conflict status for duplicate entry
    } else {
      // If no duplicate, proceed to insert
      const sqlInsertVacatingMember = 'INSERT INTO vacating_members (member_id, date_vacating, created_at) VALUES (?, ?, ?)';
      connection.query(sqlInsertVacatingMember, [memberId, deletionDate, new Date()], (err, result) => {
        if (err) {
          console.error('Error inserting vacating member:', err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        console.log('Member vacating information inserted successfully');
        res.status(200).json({ success: true });
      });
    }
  });
});

app.get('/pg/api/calendar/:year/:month', (req, res) => {
  const { year, month } = req.params;

  const queryJoining = `
    SELECT m.name AS member_name, m.date_join
    FROM members m
    WHERE MONTH(m.date_join) = ? AND YEAR(m.date_join) = ? AND m.active = 1
  `;

  const queryLeaving = `
    SELECT m.name AS member_name, vm.date_vacating
    FROM vacating_members vm
    LEFT JOIN members m ON m.member_id = vm.member_id
    WHERE MONTH(vm.date_vacating) = ? AND YEAR(vm.date_vacating) = ?
  `;

  connection.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err);
      res.status(500).send('Database error');
      return;
    }

    connection.query(queryJoining, [month, year], (errJoining, joiningResults) => {
      if (errJoining) {
        console.error('Error executing query for joining members:', errJoining);
        connection.release();
        res.status(500).send('Database error');
        return;
      }

      connection.query(queryLeaving, [month, year], (errLeaving, leavingResults) => {
        connection.release();

        if (errLeaving) {
          console.error('Error executing query for leaving members:', errLeaving);
          res.status(500).send('Database error');
          return;
        }

        res.json({ joining: joiningResults, leaving: leavingResults });
      });
    });
  });
});

// Add Statement
app.post('/pg/api/add/statements', (req, res) => {
  upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
          // A multer error occurred when uploading
          console.error('Multer error:', err);
          return res.status(500).json({ error: 'Error uploading file' });
      } else if (err) {
          // An unknown error occurred
          console.error('Unknown error:', err);
          return res.status(500).json({ error: 'Unknown error occurred' });
      }

      // File uploaded successfully, now handle other form data
      const { name, paymentType, transactionId, amount, type } = req.body;
      let photoPath = null;

      if (req.file) {
          photoPath = '/uploads/' + req.file.filename;
      }

      const sql = 'INSERT INTO statements (name, paymentType, transactionId, amount, type, photo) VALUES (?, ?, ?, ?, ?, ?)';
      connection.query(sql, [name, paymentType, transactionId, amount, type, photoPath], (err, result) => {
          if (err) {
              console.error('Error adding statement:', err);
              if (req.file) {
                  // If there was an error, delete the uploaded file
                  fs.unlinkSync(req.file.path);
              }
              return res.status(500).json({ error: 'Error adding statement' });
          }
          console.log('Statement added:', result);
          res.status(200).json({ message: 'Statement added successfully' });
      });
  });
});

app.get('/pg/api/statements', (req, res) => {
  const sql = 'SELECT * FROM statements';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching statements:', err);
      res.status(500).json({ error: 'Error fetching statements' });
      return;
    }
    res.status(200).json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});