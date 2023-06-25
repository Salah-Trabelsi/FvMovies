<template>
    <div>
        <div class="w-full">
            <form enctype="multipart/form-data" @submit.prevent="submitForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 class="text-3xl mb-5">Superheldenfilm hinzufügen</h1>
                <div class="mb-7">
                    <div class="relative mr-3 border-b border-gray-400">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg class="w-5 h-5 text-gray-800 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M8 1v3.5A1.5 1.5 0 0 0 9.5 6H13v7.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 13.5v-11A1.5 1.5 0 0 1 4.5 1H8Zm1 .25V4.5a.5.5 0 0 0 .5.5h3.25L9 1.25Z"/></svg>
                        </div>
                        <input v-model="post.title" class="appearance-none pl-10 bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"  type="text" placeholder="Title">
                    </div>
                </div>
                <div class="mb-8">
                    <div class="relative mr-3 border-b border-gray-400">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg class="w-6 h-6 text-gray-800 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M5 7h13v10H2V4h7l2 2H4v9h1V7z"/></svg>
                        </div>
                        <input v-model="post.category" class="appearance-none pl-10 bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"  type="text" placeholder="Category">
                    </div>
                </div>
                <div class="mb-6">
                    <div class="relative mr-3 border-b border-gray-400">
                        <div class="absolute inset-y-0 left-0  items-center pl-3 pointer-events-none">
                            <svg class="w-6 h-6 text-gray-800 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path fill="currentColor" d="M302.2 0H67.5v512h384V149.3H302.2V0zm64 320v42.7h-85.3V448h-42.7v-85.3h-85.3V320h85.3v-85.3h42.7V320h85.3zM323.5 0v128h128L323.5 0z"/></svg>
                        </div>
                        <textarea v-model="post.content" class="appearance-none h-[120px] pl-10 bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"  type="text" placeholder="Content" />
                    </div>
                </div>
                <div class="mb-8">
                    <div class="relative mr-3 border-b border-gray-400">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg class="w-7 h-7 text-gray-800 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g transform="rotate(-90 8 8)"><g fill="currentColor"><path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z"/><path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z"/></g></g></svg>
                        </div> 
                        <input ref="fileInput" @change="selectFile" class="appearance-none pl-10 bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" id="username" type="file" placeholder="Category" required>
                    </div>
                </div>
    
                <div class="flex items-center justify-between">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Superheldenfilm hinzufügen
                </button>
            
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import API from "../api"
    export default {

        data() {

            return {
                post: {
                    title: "",
                    category: "",
                    content: "",
                    image: ""
                },

                image: "",
            }
        },

        methods: {

            selectFile(event) {
                const file = event.target.files[0];
                const reader = new FileReader();

                reader.onloadend = () => {
                    this.image = reader.result;
                };

                reader.readAsDataURL(file);
            },


            async submitForm() {
                const formData = new FormData();
                formData.append('title', this.post.title);
                formData.append('category', this.post.category);
                formData.append('content', this.post.content);
                formData.append('image', this.$refs.fileInput.files[0]); 

                try {
                    const response = await API.addPost(formData);
                    this.$router.push({ name: 'home', params: { message: response.message } });
                } catch (error) {
                    console.error('Error adding post:', error);
                    
                }
            }


        }
    }

   
</script>

<style scoped>
::placeholder {

    color: rgb(116, 116, 116);
}
</style>