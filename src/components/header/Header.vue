
<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top">
            <div class="container">
                <a class="navbar-brand" href="#">Stock Viewer</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto">
                        <li>
                            <a href="https://github.com/arye97" class="btn btn-outline-secondary" role="button">My Github</a>
                        </li>
                        <li>
                            <a href="https://github.com/arye97" class="btn btn-outline-primary" role="button">My CV</a>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>


    </div>
</template>


<script>
    export default {
        name: 'Header',
    }
</script>

<style scoped>
    a {
        position: relative;
        margin-right: 10px;
    }
</style>
