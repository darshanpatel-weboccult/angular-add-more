import { Component } from '@angular/core';

interface Node {
  id: number;
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
  specifications: Node[] = [];
  inputNodes: Node[] = [
    // will contain input data, by default 1 input section will be there
    {
      id: 0,
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
      id: this.inputNodes.length,
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

  // Function: Deletes subtitle with provided ids.
  handleSubtitleDelete(titleId: number, subtitleId: number): void {
    this.inputNodes[titleId].children = this.inputNodes[
      titleId
    ].children.filter((child: Subtitle, index: number) => index !== subtitleId);
  }

  // Function: Inserts data in specification table
  handleSubmit(titleId: number): void {
    const node: Node = {
      ...this.inputNodes[titleId],
      children: this.inputNodes[titleId].children
        .filter((child: Subtitle) => child.subtitle || child.value)
        .map((child: Subtitle) => ({
          ...child,
        })),
    };

    let actualIndex = this.specifications.findIndex((node: Node) => {
      return node.id === this.inputNodes[titleId].id;
    });

    if (actualIndex === -1) {
      this.specifications.push(node);
    } else {
      this.specifications[actualIndex] = node;
    }

    this.specifications.sort((a: Node, b: Node) => a.id - b.id);
  }
}
