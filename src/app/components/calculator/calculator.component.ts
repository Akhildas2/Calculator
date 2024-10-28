import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})

export class CalculatorComponent {
  displayValue: string = ''; // Store the entire calculation string
  calculationHistory: { expression: string; result: number }[] = []; // Store history
  showHistory: boolean = false; // Track visibility of history
  isResultDisplayed: boolean = false; // Track if the result is currently displayed

  // Handle click event for numbers and functions
  onButtonClick(value: string, type: 'number' | 'function'): void {
    if (value === 'History' && type === 'function') {
      this.showHistory = !this.showHistory;
    } else if (type === 'number') {
      this.onNumberClick(value);
    } else if (type === 'function') {
      this.onFunctionClick(value);
    }
  }

  // Append number to display
  onNumberClick(value: string): void {
    if (this.isResultDisplayed) {
      this.displayValue = '';// Clear the display if a result was just shown
      this.isResultDisplayed = false;// Reset the flag
    }
    this.displayValue += value; // Build the expression as a string
  }

  // Handle function buttons
  onFunctionClick(value: string): void {
    if (value === 'AC') {
      this.resetCalculator();
    } else if (value === 'C') {
      this.clearCurrent();
    } else if (value === '=') {
      this.calculateResult();

    } else {
      this.displayValue += ` ${value} `; // Append the operator
    }
  }

  // Perform the calculation
  calculateResult(): void {
    try {
      const result = this.evaluateExpression(this.displayValue);

      // Add to history
      this.calculationHistory.push({
        expression: this.displayValue,
        result: result
      });

      // Show result and set the flag
      this.displayValue = result.toString();
      this.isResultDisplayed = true;

    } catch (error) {
      this.displayValue = 'Error';
    }
  }

  // calculation
  evaluateExpression(expression: string): number {
    // Replace symbols for easier parsing
    expression = expression.replace(/×/g, '*').replace(/÷/g, '/');

    // Use Function constructor for a safe calculation 
    const fn = new Function('return ' + expression);
    return fn();
  }

  // Reset calculator
  resetCalculator(): void {
    this.displayValue = '';
    this.calculationHistory = [];
    this.isResultDisplayed = false;
  }

  // Clear only the most recent input
  clearCurrent(): void {
    this.displayValue = this.displayValue.slice(0, -1);
  }


}
