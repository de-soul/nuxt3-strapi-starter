module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '31d',
      },
    },
  },
  'transformer': {
    enabled: true,
    config: {
      responseTransforms: {
        removeAttributesKey: true,
        removeDataKey: false,
      },
      requestTransforms : {
        wrapBodyWithDataKey: true
      },
      // hooks: {
      //   preResponseTransform : (ctx) => console.log('hello from the preResponseTransform hook!'),
      //   postResponseTransform : (ctx) => console.log('hello from the postResponseTransform hook!')
      // },
      // contentTypeFilter: {
      //   mode: 'allow',
      //   uids: {
      //     'api::article.article': true,
      //     'api::category.category': {
      //       'GET':true,
      //     }
      //   }
      // }
    }
  },

});
