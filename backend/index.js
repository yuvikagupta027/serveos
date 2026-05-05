var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

var app = express();

app.use(cors());
app.use(express.json());

var connection = "mongodb+srv://yuvikagupta1121:yuvika123@cluster0.jnlpjtj.mongodb.net/?appName=Cluster0"

var db;

MongoClient.connect(connection).then((succ) => {
    console.log("db connected");
    db = succ.db("mydatabase");
})

app.post("/registerform", (req, res) => {
    db.collection("users").insertOne(req.body).then((succ) => {
        res.send(succ);
    })
})

app.post("/loginform", (req, res) => {
    db.collection("users").findOne(req.body).then((succ) => {
        res.send(succ)
    })
})

app.post("/logincheck", (req, res) => {
    db.collection("users").findOne({
        _id: new mongodb.ObjectId(req.body.Id)
    }).then((succ) => {
        res.send(succ);
    })
})

app.post("/addroom", (req, res) => {
    db.collection("rooms").insertOne(req.body).then((succ) => {
        res.send("ok")
    })
})

app.post("/submitformcontact", (req, res) => {
    db.collection("form").insertOne(req.body).then((succ) => {
        res.send("ok")
    })
})

app.post("/fetchrooms", (req, res) => {
    db.collection("rooms").find().toArray().then((succ) => {
        res.send(succ);
        console.log(succ);
    })
})

app.post("/fetchform", (req, res) => {
    db.collection("form").find().toArray().then((succ) => {
        res.send(succ);
    })
})

app.post("/update-lead-status", (req, res) => {
    db.collection("form").updateOne(
        { _id: new mongodb.ObjectId(req.body.Id) },
        {
            $set: { Status: req.body.Status }
        }).then(() => {
            res.send("Status Updated");
        });
});

app.post("/deleteroom", (req, res) => {
    db.collection("rooms").deleteOne({
        _id: new mongodb.ObjectId(req.body.Id)
    }).then((succ) => {
        res.send(succ)
    })
})

app.post("/deleteform", (req, res) => {
    db.collection("form").deleteOne({
        _id: new mongodb.ObjectId(req.body.Id)
    }).then((succ) => {
        res.send(succ)
    })
})

app.post("/updateroom", (req, res) => {
    db.collection("rooms").updateOne({
        _id: new mongodb.ObjectId(req.body.Id)
    },
        {
            $set: {
                Price: req.body.Price,
                Capacity: req.body.Capacity,
                Amenities: req.body.Amenities
            }
        }).then((succ) => {
            res.send("data inserted")
        })
})

app.post("/addimage", (req, res) => {
    db.collection("images").insertOne(req.body).then((succ) => {
        res.send("ok")
    })
})
app.post("/fetchimage", (req, res) => {
    db.collection("images").find().toArray().then((succ) => {
        res.send(succ);
        console.log(succ);
    })
})
app.post("/deleteimage", (req, res) => {
    db.collection("images").deleteOne({
        _id: new mongodb.ObjectId(req.body.Id)
    }).then((succ) => {
        res.send(succ)
    })
})

app.post("/get-bookings", (req, res) => {
    db.collection("bookings").find().toArray().then((succ) => {
        res.send(succ);
    })
})

app.post("/fetchbookingss", (req, res) => {
    db.collection("bookings").find().toArray().then((succ) => {
        res.send(succ);
        console.log(succ);
    })
})

app.post("/deletebookingss", (req, res) => {
    db.collection("bookings").deleteOne({
        _id: new mongodb.ObjectId(req.body.Id)
    }).then((succ) => {
        res.send(succ)
    })
})

app.post("/get-blocked-dates", (req, res) => {
    db.collection("blockedDates").find().toArray().then((succ) => {
        res.send(succ);
    })
})

app.post("/block-date", (req, res) => {
    db.collection("blockedDates").insertOne({
        date: req.body.date
    }).then((succ) => {
        res.send("Date Blocked");
    })
})

app.post("/unblock-date", (req, res) => {
    db.collection("blockedDates").deleteOne({
        date: req.body.date
    })
        .then(() => {
            res.send({ message: "Date Unblocked" });
        })
        .catch(err => res.send(err));
});

app.post("/book-room", (req, res) => {
    db.collection("bookings").findOne({
        roomId: req.body.roomId,
        checkIn: { $lt: req.body.checkOut },
        checkOut: { $gt: req.body.checkIn }
    }).then((succcc) => {
        if (succcc) {
            res.send({ message: "Room already booked" });
        }
        else {
            db.collection("bookings").insertOne({
                roomId: req.body.roomId,
                roomName: req.body.roomName,
                checkIn: req.body.checkIn,
                checkOut: req.body.checkOut,
                guests: req.body.guests,
                customerName: req.body.customerName,
                customerEmail: req.body.customerEmail,
                customerContact: req.body.customerContact,
                note: req.body.note,

                createdAt: new Date()
            }).then((succ) => {
                res.send({ message: "Booking Successful" });
            })
        }
    })
})

app.post("/check-availability", (req, res) => {

    db.collection("bookings").find({
        checkIn: { $lt: req.body.checkout },
        checkOut: { $gt: req.body.checkin }
    }).toArray().then((bookings) => {

        let bookedRoomIds = bookings.map((b) => b.roomId.toString());

        db.collection("rooms").find().toArray().then((rooms) => {

            let availableRooms = rooms.filter((room) => {
                return !bookedRoomIds.includes(room._id.toString());
            });

            res.send(availableRooms);

        });

    });

});

app.listen(1000, (req, res) => {
    console.log("Server Started");
})


