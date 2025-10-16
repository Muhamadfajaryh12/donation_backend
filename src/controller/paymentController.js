const snap = require("../service/midtransService");
const response = require("../utils/Response");
class PaymentController {
  async Transaction({ id, amount, name, email }) {
    try {
      const parameter = {
        transaction_details: {
          order_id: id,
          gross_amount: amount,
        },
        customer_details: {
          first_name: name,
          email: email,
        },
      };

      const res = await snap.createTransaction(parameter);
      return res;
    } catch (error) {
      return error;
    }
  }

  async Notification(req, res, next) {
    try {
      const notification = req.body;
      const orderId = notification.order_id;
      const transactionStatus = notification.transaction_status;
      const fraudStatus = notification.fraud_status;
      console.log(orderId, transactionStatus);
      return response(res, 200, "Berhasil", transactionStatus);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PaymentController();
