const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());

const API_KEY = "1AB1BD8225AC1187FFCC2622AE416CC0";

const STEAM_IDS = [

"76561199241453975",
"76561199388714449",
"76561199197623141",
"76561199878751211",
"76561199854431445",
"76561199680639310",
"76561199520140484",
"76561199698724099",
"76561199570334493",
"76561199509060237",
"76561199135831116",
"76561199670596116",
"76561199473890874",
"76561199580803726",
"76561198151188240",
"76561198698651895",
"76561199760327825"

];

app.get("/members", async (req, res) => {

try {

const response = await axios.get(

`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${API_KEY}&steamids=${STEAM_IDS.join(",")}`

);

res.json(
response.data.response.players
);

} catch(err){

res.json({
error:"Steam API error"
});

}

});

app.listen(3000, () => {

console.log("Steam API running");

});