<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <div>
                    <b-button v-b-modal.modal-add-student @click="addStudent()">Add New Student</b-button>
                </div>
                
            </div>
            <div class="card-body">
                <table class="table table-hover">
                    <thead>
                    <tr>
                        <td>ID</td>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>Email</td>
                        <td>Phone Number</td>
                        <td>Actions</td>
                    </tr>
                    </thead>

                    <tbody>
                        <tr v-for="record in studentDetailsArr" :key="record.id">
                            <td>{{ record.id }}</td>
                            <td>{{ record.firstName }}</td>
                            <td>{{ record.lastName }}</td>
                            <td>{{ record.email }}</td>
                            <td>{{ record.phoneNumber }}</td>
                            <td><button class="btn btn-primary" @click="editStudent(record.id)">Edit</button></td>
                            <td><button class="btn btn-danger" @click="deleteStudentConfirmation(record.id)">Delete</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <br/>
        <br/>
        <br/>

        <b-modal id="modal-add-student" ref="modal-add-student" hide-footer>
            <div class="card">
                <div class="card-header">

                    <h3>
                        {{isEdit !== true ? "Add Student" : "Edit Student" }}
                    </h3>
                </div>
                <div class="card-body">
                    <form @submit.prevent="handleSubmit">
                        <div class="form-group">
                            <label for="firstName">First Name</label>
                            <input type="text" v-model="student.firstName" v-validate="'required'" id="firstName" name="firstName" class="form-control" :class="{ 'is-invalid': submitted && errors.has('firstName') }" />
                            <div v-if="submitted && errors.has('firstName')" class="invalid-feedback">
                            {{ errors.first("firstName") }}
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="lastName">Last Name</label>
                            <input type="text" v-model="student.lastName" v-validate="'required'" id="lastName" name="lastName" class="form-control" :class="{ 'is-invalid': submitted && errors.has('lastName') }" />
                            <div v-if="submitted && errors.has('lastName')" class="invalid-feedback">
                            {{ errors.first("lastName") }}
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" v-model="student.email" v-validate="'required|email'" id="email" name="email" class="form-control" :class="{ 'is-invalid': submitted && errors.has('email') }" />
                            <div v-if="submitted && errors.has('email')" class="invalid-feedback">
                            {{ errors.first("email") }}
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="phoneNumber">Phone Number</label>
                            <input type="text" v-model="student.phoneNumber" v-validate="{ required: true, min: 10 }" id="phoneNumber" name="phoneNumber" class="form-control" :class="{ 'is-invalid': submitted && errors.has('phoneNumber') }" />
                            <div v-if="submitted && errors.has('phoneNumber')" class="invalid-feedback">
                            {{ errors.first("phoneNumber") }}
                            </div>
                        </div>
                        <div class="form-group">
                            <button class="btn btn-outline-primary">{{isEdit !== true ? "Add Student" : "Edit Student" }}</button>
                            &nbsp;&nbsp;
                            <button type="button" class="btn btn-outline-danger" @click="closeModal">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </b-modal>
        
        <b-modal id="modal-delete-student" ref="modal-delete-student" hide-footer>
            <div class="card">
                <div class="card-header">

                    <h5>
                        Are you sure you want to remove this Student?
                    </h5>
                </div>
                <div class="card-body">
                    <button type="button" class="btn btn-outline-danger" @click="deleteStudent">Yes</button>
                    &nbsp;&nbsp;
                    <button type="button" class="btn btn-outline-primary" @click="closeDeleteModal">No</button>         
                </div>
            </div>
        </b-modal>
        
    </div>
</template>

<script>
export default {
   data: function () {
    return {
        student: {
            id : 0,
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: ""
        },
        studentId: 0,
        submitted: false,
        count : 1,
        isEdit : false,
        studentDetailsArr: []
    }
},
methods: {
    addStudent(){
        this.student    = {id : 0,firstName: "",lastName: "", email: "", phoneNumber: ""}; //Reset Form input
        this.isEdit     = false;
    },

    handleSubmit(e) {
    console.log(e);
      this.submitted = true;
      this.$validator.validate().then(valid => {
        if (valid) {
            
            // Combine add/edit code. 
            if(this.isEdit === false){
                this.student.id = this.count;
                this.studentDetailsArr.push(this.student);
                this.count      = this.count + 1
                this.student    = {id : 0,firstName: "",lastName: "", email: "", phoneNumber: ""}; //Reset Form input
                this.$refs['modal-add-student'].hide(); // Close the model dialog box
            }else{  
                const tempStudent = [];   
                tempStudent.push(this.student);
                
                const result = this.studentDetailsArr.map(obj => tempStudent.find(o => o.id === obj.id) || obj); // replacing updated student details.
                this.studentDetailsArr = result;
                this.$refs['modal-add-student'].hide(); // Close the model dialog box

            }
        }
      });
    },
    editStudent(id){
        const tempStudent = this.studentDetailsArr.filter(function( obj ) {
            return obj.id == id;
        }); 

        this.student = tempStudent[0]; 
        this.isEdit = true;
        this.$refs['modal-add-student'].show();
    },
    deleteStudentConfirmation(id){
        this.studentId = id;
        this.$refs['modal-delete-student'].show(); // Open delete confirmation pop up.
    },
    deleteStudent(){
        const id = this.studentId;
        this.studentDetailsArr = this.studentDetailsArr.filter(function( obj ) {
            return obj.id !== id;
        }); //NOTE : Make an ajax call to remove data from backend side. Here i just doing with array.
        this.$refs['modal-delete-student'].hide();
    },
    closeModal(){
        this.$refs['modal-add-student'].hide();
    },
    closeDeleteModal(){
        this.$refs['modal-delete-student'].hide();
    } 
},


}
</script>