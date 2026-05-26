const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const API_KEY = "1AB1BD8225AC1187FFCC2622AE416CC0";

const steamIds = [
"76561199698724099",
"76561198151188240",
"76561199878751211",
"76561199241453975",
"76561199509060237",
"76561199580803726",
"76561199520140484",
"76561199135831116",
"76561199760327825",
"76561199680639310",
"76561199473890874",
"76561199854431445",
"76561199670596116",
"76561198698651895",
"76561199388714449",
"76561199197623141",
"76561199570334493"
];

app.get("/", (req, res) => {
res.sendFile(__dirname + "/Site.html");
});

app.get("/members", async (req, res) => {
try{
const response = await axios.get(
`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${API_KEY}&steamids=${steamIds.join(",")}`
);

res.json(response.data.response.players);

}catch(err){
res.json({
error:"Steam API Error",
details:err.message
});
}
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log("SERVER ONLINE " + PORT);
});