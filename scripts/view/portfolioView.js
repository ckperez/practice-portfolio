(function(module){

  var portfolioView = {};

  portfolioView.populateFilter = function(){
    $('div[data-category]').each(function(){
      if(!$(this).hasClass('template')){
        var val = $(this).attr('data-category');
        var optionTag = '<option value="' + val + '">' + val + '</option>';
        if ($('#category-filter option[value="' + val + '"]').length === 0) {
          $('#category-filter').append(optionTag);
        }
      }
    });
  };

  portfolioView.handleCategoryFilter = function(){
    $('#category-filter').on('change', function(){
      if ($(this).val()){
        $('div[data-category]').hide();
        var $selectedCategory = $('div[data-category=' + $(this).val() + ']');
        $selectedCategory.show();
      } else {
        $('div[data-category]:not(.template)').show();
      }
    });
  };

  portfolioView.addFooterFacts = function(){
    var numProjects = Project.all.length;
    var numCategories = Project.all.map(function getUniqueCategories(project){
      return project.category;
    })
    .reduce(function(acc, cur, idx, arr){
      if (arr.indexOf(cur) == idx){
        acc[idx] = cur;
        return acc;
      }
    }, [])
    .length;
    if ($('footer span').length === 0){
      $('footer').append('<p>As of today, I have developed or contributed to <span>' + numProjects + '</span> <a href="/repos">projects</a> in <span>' + numCategories + '</span> unique categories.<p>');
    }
  };

  portfolioView.initIndexPage = function(){
    if ($('div[data-category]').length === 0){
      Project.all.forEach(function(instantiatedProject){
        $('#projects').append(instantiatedProject.toMyPortfolio());
      });
    };
    portfolioView.populateFilter();
    portfolioView.handleCategoryFilter();
    portfolioView.addFooterFacts();
  };

  module.portfolioView = portfolioView;

}) (window);