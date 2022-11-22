import express from 'express';
import {z} from "zod";
import { Schema } from "zod";
import validate from "../middleware/validate";
import {Bank, SchemaType} from "../zod-schema/bank-schema";

const routerbank = express.Router();

let bank: SchemaType[] = [];

routerbank.get('/', (req, res) => {
    return res.status(200).json(bank);
});

routerbank.post('/', validate(Bank), (req, res) => {
    const bnk = req.body as SchemaType;
    bank.push(bnk);
    return res.status(201).json({message: "Customer Addded."});
});

routerbank.put('/:id', validate(Bank), (req,res) =>{
    const bnk = req.body as SchemaType;
    const { id } = req.params;
    const updated = bank.filter( (bnk) => {
        return bnk.id !== id;
    });
    updated.push(bnk);
    bank = updated;
    return res.status(201).json({
        message: "Customer Updated"
    });
});

routerbank.delete('/:id', (req, res) =>{
    const { id } = req.params;
    const deleted = bank.filter( (bnk) =>{
        return bnk.id !== id;
    });
    bank = deleted;
    return res.status(201).json({
        message: "Customer Deleted"
    });
});

routerbank.put(`/wirtdraw/:id/:amount`, (req, res) => {
    const {id} = req.params;
    const amount = Number(req.params.amount);
    bank.map((customer) => {
      if (customer.id === id) {
        if (customer.balance >= amount) {
          customer.balance = customer.balance - amount;
          return res.json({
            message: `Hello ${customer.username} , you wirtdrawed ${amount} SAR from your acount . your balance now is ${customer.balance}`,
          });
        } else {
          return res.json({
            message: `sorry ${customer.username} you don't have ${amount} i your acount , your balance is ${customer.balance}`,
          });
        }
      }
    });
  });


export default routerbank;