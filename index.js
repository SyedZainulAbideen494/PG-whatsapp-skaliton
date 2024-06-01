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
const BASE_URL = 'https://a048-122-172-87-197.ngrok-free.app';
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

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

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

app.post('/webhook', (req, res) => {
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
          connection.query('INSERT INTO phone_numbers (phone_number, conversation_type, created_at) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE phone_number = ?, conversation_type = ?, created_at = ?', 
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
          connection.query('INSERT INTO phone_numbers (phone_number, conversation_type, created_at) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE phone_number = ?, conversation_type = ?, created_at = ?', 
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
          connection.query('INSERT INTO phone_numbers (phone_number, conversation_type, created_at) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE phone_number = ?, conversation_type = ?, created_at = ?', 
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
          connection.query('INSERT INTO phone_numbers (phone_number, conversation_type, created_at) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE phone_number = ?, conversation_type = ?, created_at = ?', 
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
              body: "Hello! 😊 We're excited to welcome you to Lyxn Labs PG. Here’s how to find us:\n\n*Address:*\nno 2, 15th main,\nVasanth Nagar,\nopposite to the shell petrol pump,\nBanglore 560001.\n\n*Directions:*\nFor your convenience, use this - https://maps.app.goo.gl/cX5LytoeHbkpDaUM6 - to get exact directions.\n\nIf you need any help finding us, just reply to this message or give us a call. We look forward to your stay!\n\nBest,\nLyxn Labs Team"
            }
          });
        } else if (messageBody === 'check availability') {
          connection.query('INSERT INTO phone_numbers (phone_number, conversation_type, created_at) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE phone_number = ?, conversation_type = ?, created_at = ?', 
            [senderId, 'check availability', timestamp, senderId, 'check availability', timestamp], (err, result) => {
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
              name: "temp_5_pg", // Corrected template name
              language: { code: "en_US" }
            }
          });
        } else if (messageBody === 'advance booking') {
          connection.query('INSERT INTO phone_numbers (phone_number, conversation_type, created_at) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE phone_number = ?, conversation_type = ?, created_at = ?', 
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
app.get('/webhook', (req, res) => {
  const VERIFY_TOKEN = "EAAFsUoRPg1QBOzpnPGEpxBDKEw93j35D2V0Qg5C8O58FNQZAxWXWMo0XJZB6ezMoUWY6xNC6AhPGUZCjt0w8AJwuyAfkhjnZAn73tOU88pXhTxAJevtKm1GSGkDFwh5y79N1eX9LWhD3ceZAZBr36MDd1fgAy0mP9UfVDIugUDGxcl64vAhpNuj7FkbG36HGJn3RQus1iw92DiNn4w"; // Replace with your verification token
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook verified!');
    res.status(200).send(challenge);
  } else {
    console.error('Failed verification. Make sure the verification tokens match.');
    res.sendStatus(403);
  }
});

// GET endpoint for testing
app.get('/', (req, res) => {
  res.send('Welcome to the Facebook Messenger webhook!');
});

// Success endpoint to handle successful payments
app.get('/success', async (req, res) => {
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

app.post('/addUser', (req, res) => {
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

app.get("/userAuth", verifyjwt, (req, res) => {});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/login", (req, res) => {
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

app.post('/add/members', (req, res) => {
  const { name, phoneNumber, bed, building, floor, flat, room } = req.body;

  // Get the bed_id
  const getBedIdQuery = `
      SELECT beds.id AS bed_id
      FROM buildings
      INNER JOIN floors ON buildings.id = floors.building_id
      INNER JOIN flats ON floors.id = flats.floor_id
      INNER JOIN rooms ON flats.id = rooms.flat_id
      INNER JOIN beds ON rooms.id = beds.room_id
      WHERE buildings.name = ? AND floors.floor_number = ? AND flats.flat_number = ? AND rooms.room_number = ? AND beds.bed_number = ?
  `;
  connection.query(getBedIdQuery, [building, floor, flat, room, bed], (err, results) => {
      if (err) {
          console.error('Error getting bed_id:', err);
          res.status(500).send('Error getting bed_id');
          return;
      }
      
      if (results.length === 0) {
          console.error('bed_id not found for the specified building, floor, flat, room, and bed');
          res.status(404).send('bed_id not found for the specified building, floor, flat, room, and bed');
          return;
      }

      const { bed_id } = results[0];

      // Check if the bed is already taken
      const checkBedAvailabilityQuery = `
          SELECT COUNT(*) AS count 
          FROM members 
          WHERE bed_id = ? AND active = 1
      `;
      connection.query(checkBedAvailabilityQuery, [bed_id], (err, results) => {
          if (err) {
              console.error('Error checking bed availability:', err);
              res.status(500).send('Error checking bed availability');
              return;
          }

          if (results[0].count > 0) {
              console.error('Bed is already taken');
              res.status(400).send('Bed is already taken');
              return;
          }

          // Insert the new member using the retrieved bed_id
          const addMemberQuery = `
              INSERT INTO members (name, phoneno, bed_id, active)
              VALUES (?, ?, ?, 1)
          `;
          connection.query(addMemberQuery, [name, phoneNumber, bed_id], (err, result) => {
              if (err) {
                  console.error('Error inserting member:', err);
                  res.status(500).send('Error inserting member');
                  return;
              }
              res.status(200).send('Member added successfully');
          });
      });
  });
});
app.get('/display/members', (req, res) => {
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
app.put('/api/updateMember/:id', (req, res) => {
  const memberId = req.params.id;
  
  const sql = 'UPDATE members SET active = ? WHERE member_id = ?';
  const values = [false, memberId]; // Assuming 'active' is a boolean column
  
  connection.query(sql, values, (err, result) => {
      if (err) {
          console.error('Error updating member:', err);
          res.status(500).json({ error: 'Error updating member' });
          return;
      }
      console.log('Member updated successfully');
      res.status(200).json({ message: 'Member deactivated successfully' });
  });
});

app.get('/api/vacancies', (req, res) => {
  const maxCapacity = {
      '2 sharing': 10,
      '3 sharing': 15,
      '4 sharing': 20
  };

  const query = 'SELECT room_type, COUNT(*) AS count FROM members WHERE active = 1 GROUP BY room_type';

  connection.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching occupancy:', err);
          res.status(500).send('Error fetching occupancy');
          return;
      }

      const vacancies = {
          '2 sharing': maxCapacity['2 sharing'],
          '3 sharing': maxCapacity['3 sharing'],
          '4 sharing': maxCapacity['4 sharing']
      };

      results.forEach(row => {
          vacancies[row.room_type] -= row.count;
      });

      res.json(vacancies);
  });
});

app.get('/api/revenue', (req, res) => {
  const rentPrices = {
    '2 sharing': 7500,
    '3 sharing': 6000,
    '4 sharing': 5000,
  };

  const query = 'SELECT room_type, COUNT(*) AS count FROM members WHERE active = 1 GROUP BY room_type';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching occupancy:', err);
      res.status(500).send('Error fetching occupancy');
      return;
    }

    const revenue = {
      '2 sharing': 0,
      '3 sharing': 0,
      '4 sharing': 0,
      total: 0,
    };

    results.forEach(row => {
      revenue[row.room_type] = row.count * rentPrices[row.room_type];
      revenue.total += revenue[row.room_type];
    });

    res.json(revenue);
  });
});

app.get('/api/phone-numbers', (req, res) => {
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

app.put('/update/member/:id', (req, res) => {
  const memberId = req.params.id;
  const { name, phoneNumber, buildingId, floorId, flatId, roomId, bedId } = req.body;

  // Implement logic to update details in the respective tables
  const updateMemberQuery = `
      UPDATE members
      SET name = ?, phoneNumber = ?
      WHERE id = ?
  `;
  const updateBuildingQuery = `
      UPDATE buildings
      SET name = ?
      WHERE id = ?
  `;
  const updateFloorQuery = `
      UPDATE floors
      SET floor_number = ?
      WHERE id = ?
  `;
  const updateFlatQuery = `
      UPDATE flats
      SET flat_number = ?, sharing = ?
      WHERE id = ?
  `;
  const updateRoomQuery = `
      UPDATE rooms
      SET room_number = ?
      WHERE id = ?
  `;
  const updateBedQuery = `
      UPDATE beds
      SET bed_number = ?
      WHERE id = ?
  `;

  // Execute the update queries in parallel using Promise.all or async/await
  Promise.all([
      connection.query(updateMemberQuery, [name, phoneNumber, memberId]),
      connection.query(updateBuildingQuery, [req.body.buildingName, buildingId]),
      connection.query(updateFloorQuery, [req.body.floorNumber, floorId]),
      connection.query(updateFlatQuery, [req.body.flatNumber, req.body.sharing, flatId]),
      connection.query(updateRoomQuery, [req.body.roomNumber, roomId]),
      connection.query(updateBedQuery, [req.body.bedNumber, bedId])
  ]).then(() => {
      // All update queries executed successfully
      res.status(200).send('Member details updated successfully');
  }).catch(error => {
      // Error occurred during updates
      console.error('Error updating details in tables:', error);
      res.status(500).send('Error updating member details');
  });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});