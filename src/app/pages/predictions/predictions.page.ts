import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PredictionService } from 'src/app/sevices/prediction.service';

@Component({
  selector: 'app-predictions',
  templateUrl: './predictions.page.html',
  styleUrls: ['./predictions.page.scss'],
})
export class PredictionsPage {
  no2: number = 0;
  prediction: string ='';

  constructor(private predictionService: PredictionService) {}

  makePrediction() {
    
    this.predictionService.getPrediction(this.no2).subscribe(
      response => {
        this.prediction = response.prediction;
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
}
