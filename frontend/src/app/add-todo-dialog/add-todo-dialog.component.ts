import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomSnackbarService } from '../services/custom-snackbar.service';
import { TodosDataDto, TodosService } from '../services/todos.service';
import { TOASTIE_MESSAGES } from '../../environments/toastie-messages'

@Component({
    selector: 'app-add-todo-dialog',
    templateUrl: './add-todo-dialog.component.html',
    styleUrls: ['./add-todo-dialog.component.css']
})
export class AddTodoDialogComponent implements OnInit {
    statusOptions: Status[] = [
        { value: 'Not Started', label: 'Not Started' },
        { value: 'In Progress', label: 'In Progress' },
        { value: 'Done', label: 'Done' }
    ];
    constructor(
        private formBuilder: FormBuilder,
        private todosService: TodosService,
        public dialogRef: MatDialogRef<AddTodoDialogComponent>,
        private customSnackbarService: CustomSnackbarService
    ) {}

    addTodoFormGroup = this.formBuilder.group({
        description: ['', [Validators.required]],
        status: [this.statusOptions[3], Validators.required],
        user_id: sessionStorage.getItem('userId'),
    });

    ngOnInit(): void {}

    async onSubmit() {
        try {
            const res = await this.todosService.addTodo(
                this.addTodoFormGroup.value as TodosDataDto
            );
            console.log("this.addTodoFormGroup.value as TodosDataDto", this.addTodoFormGroup.value as TodosDataDto);
            console.log("res", res);
            this.dialogRef.close();
            this.customSnackbarService.openSuccessSnackbar(`${TOASTIE_MESSAGES.addTodoSuccess}`);
        } catch (e) {
            // console.error(e.error.errors.map((error: any) => error.msg));
            // console.error(JSON.stringify(e, null, 2));
            // this.customSnackbarService.openErrorSnackbar(e.error.errors.map((error: any) => error.msg));
            console.error(e);
        }
    }
}

export interface Status {
    value: string;
    label: string;
}
