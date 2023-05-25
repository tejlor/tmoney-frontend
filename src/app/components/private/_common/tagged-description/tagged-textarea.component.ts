import {Component, Input, OnInit} from '@angular/core';
import {TFormControl} from 'src/app/components/common/form/form-control';
import {SettingService} from 'src/app/services/setting.service';

@Component({
  selector: 'tm-tagged-textarea',
  templateUrl: './tagged-textarea.component.html',
  styleUrls: ['tagged-textarea.component.scss']
})
export class TaggedTextareaComponent implements OnInit {

  @Input() label: string;
  @Input() labelStyle: object;
  @Input() control: TFormControl;

  tags: string[];


  constructor(private settingService: SettingService) {
  }

  ngOnInit(): void {
    this.settingService.settings$.subscribe(settings => {
      this.tags = settings.tags?.split(' ');
    });
  }

  onTagClick(tag: string): void {
    const textarea = document.getElementsByName(this.control.name)[0] as any;
    const startPos = textarea.selectionStart;
    const currentText = this.control.value ?? '';
    const newText = currentText.substring(0, startPos) + tag + currentText.substring(startPos, currentText.length);
    this.control.setValue(newText);
  }

}
