import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/shared/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'wd-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.scss']
})
export class CommentsSectionComponent implements OnInit {

  @Input() comments: Comment[];
  @Input() cid: string;

  public feedbackForm: FormGroup

  constructor(
    private readonly formBuilder: FormBuilder
  ) { }

  private formInit(): void {
    this.feedbackForm = this.formBuilder.group({
      text: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(500)
      ]]
    })
  }

  ngOnInit(): void {
  }

}
