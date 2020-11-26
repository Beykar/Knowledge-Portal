
/* Policy Controller
=====================================================================================================================================================================================*/
eyMercuryKnowledgeApp.controller('policyCtrl', function (communityUserData, sharedParameters, elsTilesData, resourceData, policyData, guidanceData, $scope, $state, $stateParams, $sce, $filter, $window) {
  'use strict';

  window.scrollTo(0, 0);
  $scope.$sce = $sce; 
  $scope.loggedIn = true;
  
  //get user name
  $.ajax({
    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/CurrentUser",
    method: "GET",
    cache: false,
    headers: {
        "accept": "application/json;odata=verbose",
        "content-Type": "application/json;odata=verbose"
    },
    success: function (response) {
    $scope.currentUserTitle = response.d.Title;
    
     var first_Name = $scope.currentUserTitle.split(' ')[0];

     $scope.currentUser = {};
     $scope.currentUser.First_Name = first_Name;

    //console.log(' first_Name', first_Name);
     //console.log('rootScope user object in ctrl:: ', $rootScope.currentUser);
    },
    error: function (data) {
        console.log('Error: ', data);
    }
    });


  
  
  
  //Get lifecycle tile name from URL

   // trim then remove duplicates from results array of objects
   $scope.removeDuplicates = function(myArray){ 
		var newArray = [];
		for(var i=0; i< myArray.length; i++){
			myArray[i] = myArray[i].trim();
			if(newArray.indexOf(myArray[i]) == -1){
				newArray.push(myArray[i])
			}
		}
		return newArray;
	}

  $scope.objData = sharedParameters.getDataObj();
  $scope.tileTitle = $stateParams.tileTitle;
  $scope.policyInd = $stateParams.policyName;
  $scope.activeTabs = [];
  $scope.action = "Open All";

  $scope.isOpenTab = function (tab) {
    if ($scope.activeTabs.indexOf(tab) > -1) {
      return true;
    } else {
      return false;
    }
  };

  $scope.openTab = function (tab) {
    if ($scope.isOpenTab(tab)) {
      $scope.activeTabs.splice($scope.activeTabs.indexOf(tab), 1);
    } else {
      $scope.activeTabs.push(tab);
    }
  };

  $scope.openAll = function () {
    if ($scope.action === "Close All") {
      $scope.action = "Open All";
      $scope.activeTabs = [];
    } else {
      $scope.action = "Close All";

      for (var x = 1; x < 7; x++) {
        $scope.activeTabs.push(x);
      }
    }
  }; //Create and output values for Business Unit & Service Line Select menus

  // communityUserData.getBusinessUnitData().then(
  //   function(data){
  //       $scope.busUnData = data.d.results;
  //       $scope.busUnSet = [];
  //       $scope.businessUnitArr = [];
  //       angular.forEach($scope.busUnData, function(value,key){
  //           $scope.busUnSet.push(value.FSOUKIEYG);
  //       });
  //       $scope.businessUnitArr = $scope.removeDuplicates($scope.busUnSet);
  //       $scope.businessUnitArr.push('All');
  //       console.log('$scope.busUnSetArr', $scope.businessUnitArr);
  //   }
  //   );
  //   communityUserData.getServiceLineData().then(
  //     function(data){
  //         $scope.servLineData = data.d.results;
  //         $scope.servLineSet = [];
  //         $scope.serviceLineArr = [];
  //         angular.forEach($scope.servLineData, function(value,key){
  //             $scope.servLineSet.push(value.Service_Line);
  //         });
  //         $scope.serviceLineArr = $scope.removeDuplicates($scope.servLineSet);
  //         $scope.serviceLineArr.push('All');
  //         console.log('$scope.servLineArr', $scope.serviceLineArr);
  //     }
  //   );

   $scope.businessUnitArr = ['UK', 'ROI', 'FSO UK', 'FSO ROI', 'FSO Channel Islands', 'All'];
   $scope.serviceLineArr = ['Advisory', 'Assurance', 'TAS', 'Tax', 'PAS', 'All']; //   setTimeout(function(){
  //       sharedParameters.setELS($stateParams.tileTitle);
  //       sharedParameters.setBusUnit($stateParams.businessUnit);
  //       sharedParameters.setServLine($stateParams.serviceLine);
  //       sharedParameters.setDocContentNum($scope.policyInd);
  //       //console.log('els in object at start in level3 guidance: ', sharedParameters.getDataObj());
  //       $scope.objData = sharedParameters.getDataObj();
  //       $scope.tileTitle = $scope.objData.els;
  //       $scope.selectedBusinessUnit = $scope.objData.busUn;
  //       $scope.selectedServiceLine = $scope.objData.servLine;
  //       //$scope.getData($scope.selectedBusinessUnit, $scope.selectedServiceLine);
  //   }, 100);     

  setTimeout(function () {
    sharedParameters.setELS($stateParams.tileTitle);
    sharedParameters.setBusUnit($stateParams.businessUnit);
    sharedParameters.setServLine($stateParams.serviceLine); //console.log('els in object at start: ', sharedParameters.getDataObj());

    $scope.objData = sharedParameters.getDataObj(); //Populate selection boxes

    $scope.selectedBusinessUnit = $scope.objData.busUn; //console.log('$scope.selectedBusinessUnit init: ', $scope.selectedBusinessUnit);

    $scope.selectedServiceLine = $scope.objData.servLine; //console.log('$scope.selectedServiceLine init: ', $scope.selectedServiceLine);


      $scope.loggedIn = true; //Display user name in partial

      $scope.currentUser.First_Name = $scope.objData.userData.First_Name; //console.log('$scope.currentUser.First_Name init: ', $scope.currentUser.First_Name);
      //$scope.getData($scope.selectedBusinessUnit, $scope.selectedServiceLine);
      //$state.go('engagement-lifecycle/individual', {tileTitle: $stateParams.tileTitle, businessUnit: $scope.selectedBusinessUnit, serviceLine: $scope.selectedServiceLine}, {notify: false}); 

      sharedParameters.setELS($stateParams.tileTitle);
      sharedParameters.setBusUnit($scope.selectedBusinessUnit);
      sharedParameters.setServLine($scope.selectedServiceLine);
   

    $scope.tileTitle = $scope.objData.els;
    $scope.selectedBusinessUnit = $scope.objData.busUn;
    $scope.selectedServiceLine = $scope.objData.servLine; //$scope.getData($scope.selectedBusinessUnit, $scope.selectedServiceLine);
  }, 100); //get policy Section Content

  policyData.getPolicyDataInd($scope.policyInd).then(function (data) {
    $scope.policyDataInd = data.d.results[0]; //console.log("data ind:: ", $scope.policyDataInd);
    //build the final output array

    $scope.policyDataIndItem = {
      Area: $scope.policyDataInd.Area,
      Region: $scope.policyDataInd.Region,
      BusinessUnit: $scope.policyDataInd.BusinessUnit,
      ServiceLine: $scope.policyDataInd.ServiceLine,
      ELS: $scope.policyDataInd.ELS,
      UserCategories: $scope.policyDataInd.UserCategories,
      ContentType: $scope.policyDataInd.ContentType0,
      Chaptering: $scope.policyDataInd.LevelTwoChaptering,
      Keywords: $scope.policyDataInd.Keywords,
      Heading: $scope.policyDataInd.Heading,
      StandFirst: $scope.policyDataInd.StandFirst,
      Step1Heading: $scope.policyDataInd.Step1Heading,
      Step1ContentTop1: $scope.policyDataInd.Step1ContentTop1,
      Step1ContentImages1: $scope.policyDataInd.Step1ContentImages1,
      Step1ContentBottom1: $scope.policyDataInd.Step1ContentBottom1,
      Step1ContentTop2: $scope.policyDataInd.Step1ContentTop2,
      Step1ContentImages2: $scope.policyDataInd.Step1ContentImages2,
      Step1ContentBottom2: $scope.policyDataInd.Step1ContentBottom2,
      Step1ContentTop3: $scope.policyDataInd.Step1ContentTop3,
      Step1ContentImages3: $scope.policyDataInd.Step1ContentImages3,
      Step1ContentBottom3: $scope.policyDataInd.Step1ContentBottom3,
      Step1ContentTop4: $scope.policyDataInd.Step1ContentTop4,
      Step1ContentImages4: $scope.policyDataInd.Step1ContentImages4,
      Step1ContentBottom4: $scope.policyDataInd.Step1ContentBottom4,
      Step1ContentTop5: $scope.policyDataInd.Step1ContentTop5,
      Step1ContentImages5: $scope.policyDataInd.Step1ContentImages5,
      Step1ContentBottom5: $scope.policyDataInd.Step1ContentBottom5,
      Step1ContentTop6: $scope.policyDataInd.Step1ContentTop6,
      Step1ContentImages6: $scope.policyDataInd.Step1ContentImages6,
      Step1ContentBottom6: $scope.policyDataInd.Step1ContentBottom6,
      Step2Heading: $scope.policyDataInd.Step2Heading,
      Step2ContentTop1: $scope.policyDataInd.Step2ContentTop1,
      Step2ContentImages1: $scope.policyDataInd.Step2ContentImages1,
      Step2ContentBottom1: $scope.policyDataInd.Step2ContentBottom1,
      Step2ContentTop2: $scope.policyDataInd.Step2ContentTop2,
      Step2ContentImages2: $scope.policyDataInd.Step2ContentImages2,
      Step2ContentBottom2: $scope.policyDataInd.Step2ContentBottom2,
      Step2ContentTop3: $scope.policyDataInd.Step2ContentTop3,
      Step2ContentImages3: $scope.policyDataInd.Step2ContentImages3,
      Step2ContentBottom3: $scope.policyDataInd.Step2ContentBottom3,
      Step2ContentTop4: $scope.policyDataInd.Step2ContentTop4,
      Step2ContentImages4: $scope.policyDataInd.Step2ContentImages4,
      Step2ContentBottom4: $scope.policyDataInd.Step2ContentBottom4,
      Step2ContentTop5: $scope.policyDataInd.Step2ContentTop5,
      Step2ContentImages5: $scope.policyDataInd.Step2ContentImages5,
      Step2ContentBottom5: $scope.policyDataInd.Step2ContentBottom5,
      Step2ContentTop6: $scope.policyDataInd.Step2ContentTop6,
      Step2ContentImages6: $scope.policyDataInd.Step2ContentImages6,
      Step2ContentBottom6: $scope.policyDataInd.Step2ContentBottom6,
      Step3Heading: $scope.policyDataInd.Step3Heading,
      Step3ContentTop1: $scope.policyDataInd.Step3ContentTop1,
      Step3ContentImages1: $scope.policyDataInd.Step3ContentImages1,
      Step3ContentBottom1: $scope.policyDataInd.Step3ContentBottom1,
      Step3ContentTop2: $scope.policyDataInd.Step3ContentTop2,
      Step3ContentImages2: $scope.policyDataInd.Step3ContentImages2,
      Step3ContentBottom2: $scope.policyDataInd.Step3ContentBottom2,
      Step3ContentTop3: $scope.policyDataInd.Step3ContentTop3,
      Step3ContentImages3: $scope.policyDataInd.Step3ContentImages3,
      Step3ContentBottom3: $scope.policyDataInd.Step3ContentBottom3,
      Step3ContentTop4: $scope.policyDataInd.Step3ContentTop4,
      Step3ContentImages4: $scope.policyDataInd.Step3ContentImages4,
      Step3ContentBottom4: $scope.policyDataInd.Step3ContentBottom4,
      Step3ContentTop5: $scope.policyDataInd.Step3ContentTop5,
      Step3ContentImages5: $scope.policyDataInd.Step3ContentImages5,
      Step3ContentBottom5: $scope.policyDataInd.Step3ContentBottom5,
      Step3ContentTop6: $scope.policyDataInd.Step3ContentTop6,
      Step3ContentImages6: $scope.policyDataInd.Step3ContentImages6,
      Step3ContentBottom6: $scope.policyDataInd.Step3ContentBottom6,
      Step4Heading: $scope.policyDataInd.Step4Heading,
      Step4ContentTop1: $scope.policyDataInd.Step4ContentTop1,
      Step4ContentImages1: $scope.policyDataInd.Step4ContentImages1,
      Step4ContentBottom1: $scope.policyDataInd.Step4ContentBottom1,
      Step4ContentTop2: $scope.policyDataInd.Step4ContentTop2,
      Step4ContentImages2: $scope.policyDataInd.Step4ContentImages2,
      Step4ContentBottom2: $scope.policyDataInd.Step4ContentBottom2,
      Step4ContentTop3: $scope.policyDataInd.Step4ContentTop3,
      Step4ContentImages3: $scope.policyDataInd.Step4ContentImages3,
      Step4ContentBottom3: $scope.policyDataInd.Step4ContentBottom3,
      Step4ContentTop4: $scope.policyDataInd.Step4ContentTop4,
      Step4ContentImages4: $scope.policyDataInd.Step4ContentImages4,
      Step4ContentBottom4: $scope.policyDataInd.Step4ContentBottom4,
      Step4ContentTop5: $scope.policyDataInd.Step4ContentTop5,
      Step4ContentImages5: $scope.policyDataInd.Step4ContentImages5,
      Step4ContentBottom5: $scope.policyDataInd.Step4ContentBottom5,
      Step4ContentTop6: $scope.policyDataInd.Step4ContentTop6,
      Step4ContentImages6: $scope.policyDataInd.Step4ContentImages6,
      Step4ContentBottom6: $scope.policyDataInd.Step4ContentBottom6,
      Step5Heading: $scope.policyDataInd.Step5Heading,
      Step5ContentTop1: $scope.policyDataInd.Step5ContentTop1,
      Step5ContentImages1: $scope.policyDataInd.Step5ContentImages1,
      Step5ContentBottom1: $scope.policyDataInd.Step5ContentBottom1,
      Step5ContentTop2: $scope.policyDataInd.Step5ContentTop2,
      Step5ContentImages2: $scope.policyDataInd.Step5ContentImages2,
      Step5ContentBottom2: $scope.policyDataInd.Step5ContentBottom2,
      Step5ContentTop3: $scope.policyDataInd.Step5ContentTop3,
      Step5ContentImages3: $scope.policyDataInd.Step5ContentImages3,
      Step5ContentBottom3: $scope.policyDataInd.Step5ContentBottom3,
      Step5ContentTop4: $scope.policyDataInd.Step5ContentTop4,
      Step5ContentImages4: $scope.policyDataInd.Step5ContentImages4,
      Step5ContentBottom4: $scope.policyDataInd.Step5ContentBottom4,
      Step5ContentTop5: $scope.policyDataInd.Step5ContentTop5,
      Step5ContentImages5: $scope.policyDataInd.Step5ContentImages5,
      Step5ContentBottom5: $scope.policyDataInd.Step5ContentBottom5,
      Step5ContentTop6: $scope.policyDataInd.Step5ContentTop6,
      Step5ContentImages6: $scope.policyDataInd.Step5ContentImages6,
      Step5ContentBottom6: $scope.policyDataInd.Step5ContentBottom6,
      Step6Heading: $scope.policyDataInd.Step6Heading,
      Step6ContentTop1: $scope.policyDataInd.Step6ContentTop1,
      Step6ContentImages1: $scope.policyDataInd.Step6ContentImages1,
      Step6ContentBottom1: $scope.policyDataInd.Step6ContentBottom1,
      Step6ContentTop2: $scope.policyDataInd.Step6ContentTop2,
      Step6ContentImages2: $scope.policyDataInd.Step6ContentImages2,
      Step6ContentBottom2: $scope.policyDataInd.Step6ContentBottom2,
      Step6ContentTop3: $scope.policyDataInd.Step6ContentTop3,
      Step6ContentImages3: $scope.policyDataInd.Step6ContentImages3,
      Step6ContentBottom3: $scope.policyDataInd.Step6ContentBottom3,
      Step6ContentTop4: $scope.policyDataInd.Step6ContentTop4,
      Step6ContentImages4: $scope.policyDataInd.Step6ContentImages4,
      Step6ContentBottom4: $scope.policyDataInd.Step6ContentBottom4,
      Step6ContentTop5: $scope.policyDataInd.Step6ContentTop5,
      Step6ContentImages5: $scope.policyDataInd.Step6ContentImages5,
      Step6ContentBottom5: $scope.policyDataInd.Step6ContentBottom5,
      Step6ContentTop6: $scope.policyDataInd.Step6ContentTop6,
      Step6ContentImages6: $scope.policyDataInd.Step6ContentImages6,
      Step6ContentBottom6: $scope.policyDataInd.Step6ContentBottom6
    }; //console.log(' $scope.policyDataIndItem : ',  $scope.policyDataIndItem);
  }); //get home page Tile Section Content

  elsTilesData.getELSTilesData().then(function (data) {
    $scope.homeTilesData = data.d.results;
    $scope.tileImage = $filter('filter')($scope.homeTilesData, {
      Title: $scope.tileTitle
    })[0]['ImageUrl'];
    $scope.parentELSID = $filter('filter')($scope.homeTilesData, {
      Title: $stateParams.tileTitle
    });
  });

  $scope.getData = function (busUnit, servLine) {

    if (busUnit === undefined || servLine === undefined){
      $scope.objData.busUn = $stateParams.businessUnit;
      $scope.objData.servLine = $stateParams.serviceLine;
    }
    
    //Update URL without reloading window
    $state.go('engagement-lifecycle/individual-policy/policy-name', {
      tileTitle: $stateParams.tileTitle,
      businessUnit: $stateParams.businessUnit,
      serviceLine: $stateParams.serviceLine,
      policyName: $scope.policyInd
    }, {
      notify: false
    });
    $scope.allContent = false; //Get guidance data according to ELS/BU/SL

    guidanceData.getGuidanceData().then(function (data) {
      $scope.guidanceDataObj = data.d.results;

      if ($scope.objData.busUn !== 'All' && $scope.objData.servLine === 'All') {
        //Get data for business unit and All service lines (NOT 'All' tagged serviceline content)
        $scope.filteredGuidanceDataCustom = $filter('filter')($scope.guidanceDataObj, {
          ELS: $scope.objData.els,
          BusinessUnit: $scope.objData.busUn
        }); //console.log('$scope.filteredGuidanceDataAll BS + All: ', $scope.filteredGuidanceDataCustom);
      } else if ($scope.objData.busUn === 'All' && $scope.objData.servLine !== 'All') {
        //Get data for All and  serviceline (NOT 'All' tagged business unit content)
        $scope.filteredGuidanceDataCustom = $filter('filter')($scope.guidanceDataObj, {
          ELS: $scope.objData.els,
          ServiceLine: $scope.objData.servLine
        }); //console.log('$scope.filteredGuidanceData All + SL: ', $scope.filteredGuidanceDataCustom);
      } else if ($scope.objData.busUn !== 'All' && $scope.objData.servLine !== 'All') {
        //Get data for custom BS and SL
        $scope.filteredGuidanceDataCustom = $filter('filter')($scope.guidanceDataObj, {
          ELS: $scope.objData.els,
          BusinessUnit: $scope.objData.busUn,
          ServiceLine: $scope.objData.servLine
        }); //console.log('$scope.filteredGuidanceDataCustom ',$scope.filteredGuidanceDataCustom);
      } else if ($scope.objData.busUn === 'All' && $scope.objData.servLine === 'All') {
        //Get data for All BU  and All SL 
        $scope.filteredGuidanceDataCustom = $filter('filter')($scope.guidanceDataObj, {
          ELS: $scope.objData.els
        });
        $scope.allContent = true; //console.log('$scope.filteredGuidanceDataCustom all & all content ',$scope.filteredGuidanceDataCustom);
      } //Get data for 'All' and 'All' TAGGED CONTENT


      $scope.filteredGuidanceData = $filter('filter')($scope.guidanceDataObj, {
        ELS: $scope.objData.els
      }); // console.log('$scope.filteredPolicyDataAll ',$scope.filteredPolicyData);

      $scope.filteredGuidanceDataAll = [];
      angular.forEach($scope.filteredGuidanceData, function (value, key) {
        if (value.BusinessUnit === 'All' && value.ServiceLine === 'All') {
          $scope.filteredGuidanceDataAll.push(value);
        }
      }); //console.log('$scope.filteredGuidanceDataAll ',$scope.filteredGuidanceDataAll);
      //console.log('$scope.allContent ',$scope.allContent);
    }); //Get Resource data according to ELS/BU/SL

    resourceData.getResourceData().then(function (data) {
      $scope.resourceDataObj = data.d.results;
      console.log('resources data from policy');
      elsTilesData.getELSTilesData().then(function (data) {
        $scope.homeTilesData = data.d.results; //Get corresponding Id of ELS value from ELS list

        $scope.elsID = $filter('filter')($scope.homeTilesData, {
          Title: $scope.objData.els
        })[0]['ID'];
        //console.log('ELS name & id: ', $scope.objData.els, ' & ', $scope.elsID);
        //console.log('business Unit: ', $scope.objData.busUn, ' serviceLine: ', $scope.objData.servLine);

        if ($scope.objData.busUn !== 'All' && $scope.objData.servLine === 'All') {
          //Get data for business unit and All service lines (NOT 'All' tagged serviceline content)
          $scope.filteredResourceDataCustom = $filter('filter')($scope.resourceDataObj, {
            Related_x0020_ELS_x0020_TagId: $scope.elsID,
            Related_x0020_Business_x0020_Uni: $scope.objData.busUn
          });
          //console.log('$scope.filteredResourceDataCustom BS + All: ', $scope.filteredResourceDataCustom);
        } else if ($scope.objData.busUn === 'All' && $scope.objData.servLine !== 'All') {
          //Get data for All and  serviceline (NOT 'All' tagged business unit content)
          $scope.filteredResourceDataCustom = $filter('filter')($scope.resourceDataObj, {
            Related_x0020_ELS_x0020_TagId: $scope.elsID,
            Related_x0020_Service_x0020_Line: $scope.objData.servLine
          });
          //console.log('$scope.filteredResourceDataCustom All + SL: ', $scope.filteredResourceDataCustom);
        } else if ($scope.objData.busUn !== 'All' && $scope.objData.servLine !== 'All') {
          //Get data for custom BS and SL
          $scope.filteredResourceDataCustom = $filter('filter')($scope.resourceDataObj, {
            Related_x0020_ELS_x0020_TagId: $scope.elsID,
            Related_x0020_Business_x0020_Uni: $scope.objData.busUn,
            Related_x0020_Service_x0020_Line: $scope.objData.servLine
          });
          //console.log('$scope.filteredResourceDataCustom ', $scope.filteredResourceDataCustom);
        } else if ($scope.objData.busUn === 'All' && $scope.objData.servLine === 'All') {
          //Get data for All BU  and All SL 
          $scope.filteredResourceDataCustom = $filter('filter')($scope.resourceDataObj, {
            Related_x0020_ELS_x0020_TagId: $scope.elsID
          });
          $scope.allContent = true;
          //console.log('$scope.filteredResourceDataCustom ', $scope.filteredResourceDataCustom);
        } //Get data for 'All' and 'All' TAGGED CONTENT


        $scope.filteredResourceData = $filter('filter')($scope.resourceDataObj, {
          Related_x0020_ELS_x0020_TagId: $scope.elsID
        });
        $scope.filteredResourceDataAll = [];
        angular.forEach($scope.filteredResourceData, function (value, key) {
          if (value.Related_x0020_Business_x0020_Uni === 'All' && value.Related_x0020_Service_x0020_Line === 'All') {
            $scope.filteredResourceDataAll.push(value);
          }
        }); //console.log('$scope.filteredResourceDataAll ',$scope.filteredResourceData);
      });
    }); //Get policy data according to ELS/BU/SL

    policyData.getPolicyData().then(function (data) {
      $scope.policyDataObj = data.d.results;

      if ($scope.objData.busUn !== 'All' && $scope.objData.servLine === 'All') {
        //Get data for business unit and All service lines (NOT 'All' tagged serviceline content)
        $scope.filteredPolicyDataCustom = $filter('filter')($scope.policyDataObj, {
          ELS: $scope.objData.els,
          BusinessUnit: $scope.objData.busUn
        }); //console.log('$scope.filteredPolicyDataAll BS + All: ', $scope.filteredPolicyDataCustom);
      } else if ($scope.objData.busUn === 'All' && $scope.objData.servLine !== 'All') {
        //Get data for All and  serviceline (NOT 'All' tagged business unit content)
        $scope.filteredPolicyDataCustom = $filter('filter')($scope.policyDataObj, {
          ELS: $scope.objData.els,
          ServiceLine: $scope.objData.servLine
        }); //console.log('$scope.filteredPolicyData All + SL: ', $scope.filteredPolicyDataCustom);
      } else if ($scope.objData.busUn !== 'All' && $scope.objData.servLine !== 'All') {
        //Get data for custom BS and SL
        $scope.filteredPolicyDataCustom = $filter('filter')($scope.policyDataObj, {
          ELS: $scope.objData.els,
          BusinessUnit: $scope.objData.busUn,
          ServiceLine: $scope.objData.servLine
        });
        //console.log('$scope.filteredPolicyDataCustom ', $scope.filteredPolicyDataCustom);
      } else if ($scope.objData.busUn === 'All' && $scope.objData.servLine === 'All') {
        //Get data for All BU  and All SL 
        $scope.filteredPolicyDataCustom = $filter('filter')($scope.policyDataObj, {
          ELS: $scope.objData.els
        });
        $scope.allContent = true;
      } //Get data for 'All' and 'All' TAGGED CONTENT


      $scope.filteredPolicyData = $filter('filter')($scope.policyDataObj, {
        ELS: $scope.objData.els
      }); // console.log('$scope.filteredPolicyDataAll ',$scope.filteredPolicyData);

      $scope.filteredPolicyDataAll = [];
      angular.forEach($scope.filteredPolicyData, function (value, key) {
        if (value.BusinessUnit === 'All' && value.ServiceLine === 'All') {
          $scope.filteredPolicyDataAll.push(value);
        }
      }); //console.log('$scope.filteredPolicyDataAll ',$scope.filteredPolicyDataAll);
      //console.log('$scope.allContent: ', $scope.allContent);
    });
  };

  $scope.updateSelection = function (busUn, servLine) {
    $stateParams.businessUnit = busUn;
    $stateParams.serviceLine = servLine;
    //console.log('inside level3 how to', busUn, '  ',  servLine);
    sharedParameters.setBusUnit(busUn);
    sharedParameters.setServLine(servLine);
    $scope.getData($scope.objData.busUn, $scope.objData.servLine); // $window.location.href = "SitePages/index.aspx/engagement-lifecycle/" + sharedParameters.getDataObj().els + "/" + sharedParameters.getDataObj().busUn +"/"+ sharedParameters.getDataObj().servLine + "/policy-"+ sharedParameters.getDataObj().contentNum;
  };

  $scope.nullData = function () {
    if ($scope.policyDataIndItem === undefined) {
      return true;
    } else {
      if ($scope.policyDataIndItem.Step1Heading === null && $scope.policyDataIndItem.Step2Heading === null && $scope.policyDataIndItem.Step3Heading === null && $scope.policyDataIndItem.Step4Heading === null && $scope.policyDataIndItem.Step5Heading === null && $scope.policyDataIndItem.Step6Heading === null) {
        return true;
      } else {
        return false;
      }
    }
  };
});