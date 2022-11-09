// https://openapi.11st.co.kr/openapi/OpenApiService.tmall?key=c443c92e6d6723b792b6335e6843bc6a&apiCode=ProductSearch&keyword=phone

// import
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const moment = require("moment");
require("dotenv").config();
const db = require("./db/db");
const fs = require("fs");
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("uploads"));

// url

// listen
