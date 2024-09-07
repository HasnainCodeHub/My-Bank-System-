#! /usr/bin/env node
/*============================== MY BANK ==================================*/

import inquirer from "inquirer"
import {faker, tr} from "@faker-js/faker";
import chalk from "chalk"


console.log(chalk.bold.yellow("\t\t Welcome To Hasnain's Coding World"));
console.log("=".repeat(70));

 class Customer {
    firstName: string
    lastName: string
    age: number
    gender: string
    mobileNumber: number
    accountNumber: number

    constructor(
        fName: string,
        lName: string,
        age: number,
        gender: string,
        contact: number,
        acc: number) {

        this.firstName = fName,
        this.lastName = lName,
        this.age = age
        this.gender = gender
        this.mobileNumber = contact
        this.accountNumber = acc
    }
} 

interface BankAccount{
    accNumber:number
    balance:number
}

class Bank {
    customer:Customer[] = []
    account : BankAccount [] =[]

    add_Customer(obj:Customer){
        this.customer.push(obj)
    }
    add_Account_Number(obj:BankAccount){
        this.account.push(obj)
    }
    amount_after_withdrawl(accObj:BankAccount){
        let newBalance = this.account.filter((acc) => acc.accNumber !== accObj.accNumber)
        this.account = [...newBalance, accObj]
    }
}

let myBank = new Bank ()
for(let i : number = 1; i <= 5; i++){
    let fName = faker.person.firstName('male')
    let lName = faker.person.lastName('male')
    let num = parseInt('3' + faker.string.numeric(9));
    const cus = new Customer (fName,lName,17*i,"Male",num,1000 + i)
    myBank.add_Customer(cus)
    myBank.add_Account_Number({accNumber:cus.accountNumber,balance:50000 * i})

}

async function bankService(bank:Bank) {
    do{    let service = await inquirer.prompt({
        name:"Options",
        type:"list",
        message:chalk.bold.green("Select What You Want To Do"),
        choices:["View Balance","Cash Withdrawl","Cash Deposit","Exit"] 
        })
  if (service.Options == "View Balance") {
      let res = await inquirer.prompt({
          type:"input",
          name:"num",
          message:chalk.bold.green("Please Enter Your Account Number"),
          transformer: (input: number) => {
              return chalk.yellowBright(input); // Change the input color
          }
      })
      let account = myBank.account.find((acc) => acc.accNumber == res.num)
      if(!account){
          console.log(chalk.bold.italic.red("Invalid Account Number"));
      }
           
      if(account){
          let name = myBank.customer.find((item) => item.accountNumber == account?.accNumber)
          console.log(chalk.bold.blue("Dear"),`${chalk.italic.bold.yellow(name?.firstName)} ${chalk.bold.italic.yellow(name?.lastName)}`,chalk.bold.blue("Your Account Balance Is",`${chalk.bold.yellow("$",account.balance)}`));
          
      }
  }
  if (service.Options == "Cash Withdrawl") {
      let res = await inquirer.prompt({
          type:"input",
          name:"num",
          message:chalk.bold.green("Please Enter Your Account Number"),
          transformer: (input: number) => {
              return chalk.yellowBright(input); // Change the input color
          }
      })
      let account = myBank.account.find((acc) => acc.accNumber == res.num)
      if(!account){
          console.log(chalk.bold.italic.red("Invalid Account Number"));
      }
  
      if(account){
          let ans = await inquirer.prompt({
              name:"amount",
              type:"input",
              message:chalk.bold.green("Enter An Amount You want To Withdarwl"),
              transformer: (input: number) => {
                  return chalk.yellowBright(input); // Change the input color
              }
          })
          if(ans.amount > account.balance){
              console.log(chalk.bold.italic.red("Insuficient Balance"));
              
          }
          let newAmount = account.balance - ans.amount
          bank.amount_after_withdrawl({accNumber:account.accNumber,balance:newAmount})
          if(ans.amount <= account.balance){
              console.log(chalk.bold.yellowBright("Your remaining Balance is", `${chalk.green('$',newAmount)}`))
          }       
      }
  
  } 
  if (service.Options == "Cash Deposit") {
      let res = await inquirer.prompt({
          type:"input",
          name:"num",
          message:chalk.bold.green("Please Enter Your Account Number"),
          transformer: (input: number) => {
              return chalk.yellowBright(input); // Change the input color
          }
      })
      let account = myBank.account.find((acc) => acc.accNumber == res.num)
      if(!account){
          console.log(chalk.bold.italic.red("Invalid Account Number"));
      }
  
      if(account){
          let ans = await inquirer.prompt({
              name:"amount",
              type:"number",
              message:chalk.bold.green("Enter An Amount You want To Deposit"),
              transformer: (input: number) => {
                  return chalk.yellowBright(input); // Change the input color
              }
          })
          let newAmount : number = account.balance + ans.amount
          bank.amount_after_withdrawl({accNumber:account.accNumber,balance:newAmount})
          console.log(chalk.bold.yellowBright("Your New Balance is", `${chalk.green('$',newAmount)}`))
          

      }
  }
  if
    (service.Options == "Exit"){
      console.log(chalk.bold.italic.red("Thank You For Using Bank Of Hasnain Ali "));
      process.exit()
      
    }
  }
  while(true)
  }
bankService(myBank);
