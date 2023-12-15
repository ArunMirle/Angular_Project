import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PaginationModule, PageChangedEvent } from 'ngx-bootstrap/pagination';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
@Component({
  selector: 'app-studentcrud',
  templateUrl: './studentcrud.component.html',
  styleUrls: ['./studentcrud.component.css']
})

export class StudentcrudComponent {
  StudentArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  isSortButtonPressed: boolean = false;
  isAscending: boolean = true;
  isDescending: boolean = true;
  StudentArray1: any[] = [];
  totalItems: number = 0;
  pageNumber: number = 1;
  totalRecordCount: number = 0;
  firstname: string = "";
  lastname: string = "";
  emailAddress: string = "";
  password: string = "";
  isDuplicateEmail: boolean = false;
  formSubmitted = false;
  pageSize: number = 6;
  duplicateError: string = '';
  sortedColumn: string = '';
  sortDirection: string = 'asc';
  showTableView: boolean = false;
  showGridView: boolean = false;
  showTileView: boolean = false;
  currentStudentID: string = '';
  selectedStudent: any;
  currentStudentID1: any;
  goToPageNumber: any;
  constructor(private http: HttpClient, private location: Location) {

  }


  ngOnInit(): void {
    this.getAllStudent2(this.pageNumber)
    this.getTotalRecordCount();

  }
  resetPagination() {
    this.pageNumber = 1;
    // You may also want to reset other pagination-related properties if any
  }
  onGoToPage() {
    console.log("HII");
    // Check if the entered page number is within the valid range
    console.log(this.goToPageNumber);
    if (this.goToPageNumber >= 1 && this.goToPageNumber <= this.totalRecordCount) {
      // Call the API with the specified page number
      this.getAllStudent2(this.goToPageNumber);
      this.onPageClick(this.goToPageNumber);
    } else {
      // Handle invalid page number (e.g., show an error message)
      console.error('Invalid page number');
    }
  }

  toggleView(view: string) {
    this.showTableView = view === 'table' ? !this.showTableView : false;
    this.showGridView = view === 'grid' ? !this.showGridView : false;
    this.showTileView = view === 'tile' ? !this.showTileView : false;
    this.resetPagination();
    this.isSortButtonPressed = false;
    this.goToPageNumber = null;
    if (this.showTableView) {
      this.getAllStudent2(this.pageNumber);
    } else if (this.showGridView) {
      this.getAllStudent2(this.pageNumber);
    } else if (this.showTileView) {
      this.getAllStudent2(this.pageNumber);
    }

    // Manually trigger change detection
  }


  getAllStudent1() {
    // Fetch all data without pagination
    this.http.get('https://localhost:7188/api/Student/GetStudent1')
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log("Resultttt", resultData);
        this.StudentArray1 = resultData;



      });
  }
  getTotalRecordCount() {
    // Call the API to get total record count
    this.http.get<{ totalRecords: number }>('https://localhost:7188/api/Student/GetTotalRecordCount')
      .subscribe(
        (response) => {
          this.totalRecordCount = response.totalRecords;
          console.log("TotalCount", this.totalRecordCount);
        },
        (error) => {
          console.error("Error fetching total record count", error);
        }
      );
  }



  handleSortButtonClick(column: string) {

    console.log(`Sort button clicked for column: ${column}`);
    this.isSortButtonPressed = true;

    if (this.sortedColumn === column) {
      this.isAscending = !this.isAscending;
      this.isDescending = !this.isDescending;
    } else {

      this.sortedColumn = column;
      this.isAscending = true;
      this.isDescending = false;
    }
    this.pageNumber = 1;
    this.getAllStudent2(this.pageNumber);

  }
  //Table-Buttons

  isNextButtonDisabled(): boolean {
    return (this.pageNumber * this.pageSize) >= this.totalRecordCount;
  }
  getPages(): number[] {
    const totalPages = Math.ceil(this.totalRecordCount / this.pageSize);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  onPageClick(page: number) {
    this.pageNumber = page;
    this.getAllStudent2(this.pageNumber);
  }

  onNext() {
    this.pageNumber++;
    this.getAllStudent2(this.pageNumber,);
  }

  onPrevious() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.getAllStudent2(this.pageNumber,);
    }
  }

  // API

  getAllStudent2(pageNumber: number) {
    if (this.isSortButtonPressed == true) {
      console.log("HI");
      console.log("ValueINeed", this.sortedColumn)
      if (this.isAscending) {
        console.log("ASENDING")
        const apiUrl = `https://localhost:7188/api/Student/GetStudent1?Page=${pageNumber}&PageSize=6&Sorts=${this.sortedColumn}`;
        console.log("BooleanValue", this.isSortButtonPressed);
        console.log("API", apiUrl);
        // Fetch data based on the provided page number
        this.http.get(apiUrl)
          .subscribe((resultData: any) => {
            this.isResultLoaded = true;
            console.log("Resultttt", resultData);
            this.StudentArray = resultData;
            this.totalItems = resultData.length;
            this.getTotalRecordCount(); // Assuming the API provides the totalItems count
          });
      }
      else {
        const apiUrl = `https://localhost:7188/api/Student/GetStudent1?Page=${pageNumber}&PageSize=6&Sorts=-${this.sortedColumn}`;
        
        console.log("descending");
        console.log("BooleanValue", this.isSortButtonPressed);
        console.log("API", apiUrl);
        // Fetch data based on the provided page number
        this.http.get(apiUrl)
          .subscribe((resultData: any) => {
            this.isResultLoaded = true;
            console.log("Resultttt", resultData);
            this.StudentArray = resultData;
            this.totalItems = resultData.length;
            this.getTotalRecordCount(); // Assuming the API provides the totalItems count
          });
      }
    }
    else {
      console.log("Bye")
      const apiUrl = `https://localhost:7188/api/Student/GetStudent1?Page=${pageNumber}&PageSize=6`;
      console.log("BooleanValue", this.isSortButtonPressed);
      // Fetch data based on the provided page number
      this.http.get(apiUrl)
        .subscribe((resultData: any) => {
          this.isResultLoaded = true;
          console.log("Resultttt", resultData);
          this.StudentArray = resultData;
          this.totalItems = resultData.length;
          this.getTotalRecordCount(); // Assuming the API provides the totalItems count
        });
    }
  }





  getAllStudent(pageNumber: number) {
    // Fetch data based on the provided page number
    this.http.get(`https://localhost:7188/api/Student/GetStudent1?Page=${pageNumber}&PageSize=6`)
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log("Resultttt", resultData);
        this.StudentArray = resultData;
        this.totalItems = resultData.length;
        this.getTotalRecordCount(); // Assuming the API provides the totalItems count
      });
  }
  register() {
    if (!this.firstname || !this.lastname || !this.emailAddress || !this.password) {
      // No need for an alert, just let the inline messages show up
      return;
    }



    let bodyData = {
      "firstname": this.firstname,
      "lastname": this.lastname,
      "emailAddress": this.emailAddress,
      "password": this.password,
    };

    this.http.post("https://localhost:7188/api/Student/AddStudent", bodyData).subscribe(
      (resultData: any) => {
        console.log(resultData);
        alert("Student Registered Successfully");
        this.getTotalRecordCount();
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        if (error.status === 400) {
          // Handle the 400 error, assuming your backend returns an error object with a 'message' property
          this.duplicateError = error.error;
          this.formSubmitted = true;
        }
      });
  }




  setUpdate(data: any) {

    this.firstname = data.firstName;
    this.lastname = data.lastName;
    this.emailAddress = data.emailAddress;
    this.password = data.password;
    this.isDuplicateEmail = false;

    this.currentStudentID = data.id;

  }

  UpdateRecords() {
    console.log("HIIIIIIIIIIIIIIIIIIIIIIIii")
    let bodyData = {
      //"id": this.currentStudentID,
      "firstName": this.firstname,
      "lastName": this.lastname,
      "emailAddress": this.emailAddress,
      "password": this.password,
      "id": this.currentStudentID
    };
    console.log("BodyData", bodyData);

    this.http.patch(`https://localhost:7188/api/Student/UpdateStudent/${this.currentStudentID}`, bodyData)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert("Student Registered Updated");
        this.getAllStudent2(this.pageNumber);
      });
  }

  save() {
    if (this.currentStudentID == '') {
      this.register();
    }
    else {
      this.UpdateRecords();
    }

  }

  setDelete(data: any) {
    this.http.delete("https://localhost:7188/api/Student/DeleteStudent" + "/" + data.id)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert("Student Deleted");
        console.log("StudentArray", this.StudentArray)
        // Check if the table is empty after deletion
        if (this.StudentArray.length === 1 && this.pageNumber > 1) {
          // If the table is empty, and it's not the first page, navigate to the previous page
          this.pageNumber--;
          this.getAllStudent(this.pageNumber);
        } else {
          // If not, refresh the current page
          this.getAllStudent(this.pageNumber);
        }
        this.getTotalRecordCount();

      });
  }

}
