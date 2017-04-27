app
    .constant('ROUTES', {
        'app': {
            abstract: true,
            url: '/app',
            templateUrl: 'views/app.html'
        },
        'app.albums': {
            abstract: true,
            url: '/albums',
            template: '<div ui-view></div>'
        },
        'app.albums.list': {
            url: '/list',
            controller: 'AlbumsCtrl',
            templateUrl: 'views/pages/albums/list.html'
        },
        'app.albums.new': {
            url: '/new',
            controller: 'AlbumsCtrl',
            templateUrl: 'views/pages/albums/new.html'
        },
        'app.albums.edit': {
            url: '/edit/:albumId',
            controller: 'AlbumsCtrl',
            templateUrl: 'views/pages/albums/edit.html'
        },
        'app.albums.show': {
            url: '/show/:id',
            controller: 'AlbumsCtrl',
            templateUrl: 'views/pages/albums/show.html'
        }
    });
