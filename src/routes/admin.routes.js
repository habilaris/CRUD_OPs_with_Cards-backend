const router = express.Router();
const cardRoutes = require("./admin/card.routes.js");

router.use("/admin", cardRoutes);

module.exports = router;
