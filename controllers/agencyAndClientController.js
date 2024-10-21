const Agency = require("../models/agency");
const Client = require("../models/client");

// Create an agency and a client
exports.createAgencyAndClient = async (req, res) => {
  try {
    const { agency, client } = req.body;
    if (!agency || !client)
      return res
        .status(400)
        .json({ message: "Agency and Client data are required" });

    // Create Agency
    const newAgency = new Agency(agency);
    const savedAgency = await newAgency.save();

    // Create Client associated with the agency
    const newClient = new Client({
      ...client,
      agencyId: savedAgency._id,
    });
    await newClient.save();

    res.status(201).json({ message: "Agency and Client created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating agency and client", error });
  }
};

// Update client
exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedClientData = req.body;

    const client = await Client.findByIdAndUpdate(id, updatedClientData, {
      new: true,
    });
    if (!client) return res.status(404).json({ message: "Client not found" });

    res.status(200).json({ message: "Client updated successfully", client });
  } catch (error) {
    res.status(500).json({ message: "Error updating client", error });
  }
};

// Get agency with top clients by TotalBill
exports.getTopClient = async (req, res) => {
  try {
    const clients = await Client.find()
      .sort({ totalBill: -1 })
      .limit(1)
      .populate("agencyId", "name");

    if (!clients.length)
      return res.status(404).json({ message: "No clients found" });

    const topClientData = clients.map((client) => ({
      AgencyName: client.agencyId.name,
      ClientName: client.name,
      TotalBill: client.totalBill,
    }));

    res.status(200).json(topClientData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching top client", error });
  }
};
