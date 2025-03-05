import { Component } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { UIModule } from "../../../shared/ui/ui.module";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-verify-template',
  templateUrl: './verify-template.component.html',
  styleUrls: ['./verify-template.component.css'],
  standalone:true,
  imports: [NgSelectModule, UIModule,ReactiveFormsModule,CommonModule, FormsModule ]
})
export class VerifyTemplateComponent {
templateName: any;
bodyText: any;
footerText: any;
productForm: any;
content:FormGroup
showTextHeader:boolean = false
showImageHeader:boolean = false
showDocumentHeader:boolean = false
showButtonArea:boolean = false
showCallButtonArea:boolean = false
breadCrumbItems: Array<{}>;
footerData:String = ''
bodyData:any = ''
selectedBackground:String
formattedBodyData: string = '';
changeColor:String = 'yellow';
  constructor(public formBuiler:FormBuilder)
  {

  }

  // Form submition
  submit: boolean;
  files: File[] = [];
  buttonsArea:FormGroup
  header:any[]= [{Name:"None",value:100},{Name:"Text",value:101},{Name:"Image",value:102},{Name:"Document",value:103}];

  obj = {Name:"Add Button",value:200}
  buttons = [
    
    {Name:"Visit Website - Maximum two buttons",value:201},
    {Name:"Call phone number - Maximum one button",value:202},
   
  ]
  ngOnInit() {

    this.content = this.formBuiler.group({
      myHeader:[''],
      headerText:[''],
      bodyDataText:[''],
      footer:['']
    })

    this.buttonsArea = this.formBuiler.group({
      buttonText: ['Visit website'],
      websiteUrl: [''],
      addButton:['']

    });

    this.content.patchValue({
      myHeader:this.header[0].value
    })

    this.buttonsArea.patchValue({
      addButton:this.obj.value
    })
   

  }




  updatePreview() {
    throw new Error('Method not implemented.');
    }



  headerChange(selectedValue:any)
  {
    console.log(selectedValue);

    if(selectedValue.value == 100)
      {
        this.changeColor = 'white';
        this.showTextHeader = false
        this.showDocumentHeader = false
        this.showImageHeader = false
      }
    if(selectedValue.value == 101)
    {
      this.changeColor = 'white';
      this.showTextHeader = true
      this.showDocumentHeader = false
      this.showImageHeader = false
    }
    if(selectedValue.value == 102)
    {
      this.changeColor = 'gray';
      // 
      this.showTextHeader = false
      this.showDocumentHeader = false
      this.showImageHeader = true
    }
    if(selectedValue.value == 103)
      {
        this.changeColor = 'white';
        this.showTextHeader = false
        this.showDocumentHeader = true
        this.showImageHeader = false
      }

      
  }

  errorMessage: string = '';

  onFileSelected(event: any) {
    const file: File = event.target.files[0]; 

    if (file) {
      const fileType = file.type; 

      if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
        this.errorMessage = 'Only JPG and PNG files are allowed!';
        event.target.value = ''; 
      } else {
        this.errorMessage = ''; 
        console.log('Selected File:', file);
      }
    }
  }

  onFileSelected2(event: any) {
    const file: File = event.target.files[0]; 

    if (file) {
      const fileType = file.type; 

      if (fileType !== 'image/pdf') {
        this.errorMessage = 'Only .pdf files are allowed!';
        event.target.value = ''; 
      } else {
        this.errorMessage = ''; 
        console.log('Selected File:', file);
      }
    }
  }

  count:any = 0
  showSecondButtonArea = false
  handleButtonChange(event: any) {
    debugger
    if (event === 201) {
      this.count++;
      this.showButtonArea = true;
  
      if(this.count == 2)
      {
          this.showSecondButtonArea = true
      }
      
      if (this.count >= 2) {
        this.disableButton(201);
      }
    }
  
    if (event === 202) {
      this.showCallButtonArea = true;
  
      
     
    }
  }

  disableButton(button: any) {
    return button.value === 201 && this.count >= 2; 
  };


  callToActionForm: FormGroup;

  removeCallToAction() {
 
    this.count--;
    this.showButtonArea = false
  }


  removeSecondButtonArea()
  {
    this.count--;
    this.showSecondButtonArea = false
  }
  

  removeCallButtonArea()
  {
    this.showCallButtonArea = false
  }








//change made below

textData:String = ''
isHeaderText:boolean = false
textChage(text:any)
{

  let textValue = this.content.get("headerText").value
  console.log("&&&",textValue);
  
    console.log("***",text)

}

onBodyInputChange(event: any) {
  this.bodyData = event.target.value;
  this.formatBoldText();
}

formatBoldText() {
  // Replace text inside *...* with <strong>...</strong>
  this.formattedBodyData = this.bodyData.replace(/(^|\s)\*(.*?)\*(?=\s|$)/g, '$1<strong>$2</strong>');
}

boldButtonClik() {
  // Ensure there is a space before adding `**`
  if (!this.bodyData.endsWith(' ')) {
    this.bodyData += ' ';
  }
  this.bodyData += '**';
}


italicButtonClik()
{
  if (!this.bodyData.endsWith(' ')) {
    this.bodyData += ' ';
  }
  this.bodyData += '__';
}



}
