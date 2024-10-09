import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  displayValue: number = 0; //show on the screen
  currentOperation: string = 'None';//keep track of the operation
  inputValue: string = '';//hold current 
  firstOperand: number = 0;//store the first operand
  secondOperand: number = 0;//store the second operand

  //handle click event for numbers and functions
  onButtonClick(value: string, type: 'number' | 'function'): void {
    if (type === 'number') {
      this.onNumberClick(value);
    } else if (type === 'function') {
      this.onFunctionClick(value);
    }
  }

  //number click
  onNumberClick(value: string): void {
    if (this.inputValue !== '') {
      this.inputValue += value;//concatenate  
    } else {
      this.inputValue = value;//start new number
    }
    this.displayValue = parseFloat(this.inputValue);//update display
  }

  //function click
  onFunctionClick(value: string): void {
    if (value === 'AC') {
      this.resetCalculator();
    } else if (value === 'C') {
      this.clearCurrent();
    } else if (this.currentOperation === 'None') {
      // Store first operand and operation
      this, this.firstOperand = this.displayValue;
      this.currentOperation = value;
      this.clearCurrentInput();
    } else {
      this.secondOperand = this.displayValue;
      this.performCalculation(value);
    }

  }

  //perform calculation
  performCalculation(nextOperation: string): void {
    let result: number;
    switch (this.currentOperation) {
      case '+':
        result = this.firstOperand + this.secondOperand;
        break;
      case '-':
        result = this.firstOperand - this.secondOperand;
        break;
      case '*':
        result = this.firstOperand * this.secondOperand;
        break;
      case '/':
        result = this.firstOperand / this.secondOperand;
        break;
      case '%':
        result = this.firstOperand % this.secondOperand;
        break;
      default:
        return;
    }

    this.updateValuesAfterCalculation(result, nextOperation);
  }

  updateValuesAfterCalculation(result: number, nextOperation: string): void {
    this.displayValue = result;
    this.firstOperand = result;
    this.secondOperand = 0;
    this.clearCurrentInput();
    this.currentOperation = nextOperation;

    if (nextOperation === '=') {
      this.resetOperation();

    }

  }

  //Reset calculator
  resetCalculator(): void {
    this.firstOperand = 0;
    this.secondOperand = 0;
    this.displayValue = 0;
    this.currentOperation = 'None';
    this.clearCurrentInput();
  }

  //Reset operation
  resetOperation(): void {
    this.currentOperation = 'None';
    this.clearCurrentInput();
  }

  //clear the current input
  clearCurrentInput(): void {
    this.inputValue = '';
  }

  //clear only the most recent input
  clearCurrent(): void {
    this.displayValue = 0;
    this.inputValue = '';
    this.secondOperand = 0;
  }
}
