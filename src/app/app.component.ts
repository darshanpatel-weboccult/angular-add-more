import { Component } from '@angular/core';
import Swal from 'sweetalert2';

interface Node {
  title: string;
  children: Subtitle[];
}

interface Subtitle {
  subtitle: string;
  value: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // Variables Initialization
  inputNodes: Node[] = [
    // will contain input data, by default 1 input section will be there
    {
      title: '',
      children: [
        {
          subtitle: '',
          value: '',
        },
        {
          subtitle: '',
          value: '',
        },
      ],
    },
  ];

  // Function: Adds new title input
  addTitle(): void {
    const newTitle: Node = {
      title: '',
      children: [],
    };
    this.inputNodes.push(newTitle);
  }

  // Function: adds new child in specified title
  addChild(titleId: number): void {
    const newSubtitle: Subtitle = {
      subtitle: '',
      value: '',
    };
    this.inputNodes[titleId].children.push(newSubtitle);
  }

  // Function: updates title value of specified title
  handleTitleChange(titleId: number, target: EventTarget | null): void {
    if (!(target instanceof HTMLInputElement)) return;
    const value = target.value;
    this.inputNodes[titleId].title = value;
  }

  // Function: Updates values of subtitle and value based on provided id and field name.
  handleSubtitleChange(
    titleId: number,
    subtitleId: number,
    field: 'subtitle' | 'value',
    target: EventTarget | null
  ): void {
    if (!(target instanceof HTMLInputElement)) return;

    this.inputNodes[titleId].children[subtitleId][field] = target.value;
  }

  // Function: Deletes Title with provided id.
  async handleTitleDelete(titleId: number): Promise<void> {
    if (!(await this.getDeletePrompt())) return;
    this.inputNodes = this.inputNodes.filter(
      (child: Node, index: number) => index !== titleId
    );
  }
  // Function: Deletes subtitle with provided ids.
  async handleSubtitleDelete(
    titleId: number,
    subtitleId: number
  ): Promise<void> {
    if (!(await this.getDeletePrompt())) return;
    this.inputNodes[titleId].children = this.inputNodes[
      titleId
    ].children.filter((child: Subtitle, index: number) => index !== subtitleId);
  }

  // Function: asks user to confirm delete and returns true or false
  async getDeletePrompt(): Promise<boolean> {
    let shouldDelete = true;
    await Swal.fire({
      title: 'Are You Sure About That??',
      text: 'You will not be able to recover this data!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Please Delete It!',
      cancelButtonText: 'No, Keep It',
    }).then((result) => {
      shouldDelete = result.isConfirmed;
    });
    return shouldDelete;
  }

  // Function: returns Subtitles containing value in them.
  filterChildren(titleId: number): Subtitle[] {
    return this.inputNodes[titleId].children.filter(
      (child: Subtitle) => child.subtitle || child.value
    );
  }
}
