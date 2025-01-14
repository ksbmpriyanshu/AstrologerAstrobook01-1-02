import {
  View,
  Text,
  Dimensions,
  Image,
  FlatList,
  StyleSheet,
  ImageBackground,
  // Modal,
  TouchableOpacity
} from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import MyHeader from '../../components/MyHeader';
import { useRoute } from '@react-navigation/native';
import {
  colors,
  fonts,
  getFontSize,
} from '../../config/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useState } from 'react';
import MyLoader from '../../components/MyLoader';
import { connect } from 'react-redux';
const { width, height } = Dimensions.get('screen');
import { useTranslation } from 'react-i18next';
import { base_url, img_url } from '../../config/Constants';
import { Colors, Sizes, Fonts } from '../../assets/style';
import { showNumber } from '../../utils/services';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import Stars from 'react-native-stars';
import moment from 'moment';
import * as ProviderActions from '../../redux/actions/ProviderActions'
import * as SettingActions from '../../redux/actions/SettingActions'
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Expertise from '../AstroloferDetailes/Expertise';
import * as HistoryActions from '../../redux/actions/HistoryActions';

const AstrologerDetailes = ({
  navigation,
  dispatch,
  reviewData,
  astroData,
  locationData, subLocationData,route,
  UpdateProfile
}) => {
  console.log(astroData?.skill, 'skills data ')
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  // const route = useRoute();
  const route1 = useRoute();
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedExpertise, setSelectedExpertise] = useState([]);


  useEffect(() => {

    console.log("Route Params:........ ", route.params);
    if (route.params?.selectedLanguages) {
      setSelectedLanguages(route.params.selectedLanguages);
    }
  }, [route.params?.selectedLanguages]);


  useEffect(() => {

    console.log("Route Params:........2 ", route1.params);
    if (route1.params?.selectedExpertise) {
      setSelectedExpertise(route1.params.selectedExpertise);
    }
  }, [route1.params?.selectedExpertise]);


  useEffect(() => {
    return () => {
      dispatch(SettingActions.setLocationData(null))
      dispatch(SettingActions.setSubLocationData(null))
    }
  }, [dispatch])

   useEffect(() => {
          dispatch(HistoryActions.getSelectLanguageDATA());
      }, [dispatch]);





      const Updateastroprofile = () => {
      
      
              const data = {
      
                // language: 
                // skill:
                // mainExpertise:
                // address:
              }
      
      
              dispatch(HistoryActions.getUpdateProfileDATA(data));
          };





  const [state, setState] = useState({
    seeMore: false,
    seeMore1: false
  });
  useEffect(() => {
    dispatch(SettingActions.getProviderData())
  }, [dispatch])
  console.log(astroData, 'astroDataa')

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <MyHeader
          title={'Profile'}
          navigation={navigation}
          statusBar={{
            backgroundColor: colors.new_color,
            barStyle: 'light-content',
          }}
        />
      ),
    });
  }, []);

  useEffect(() => {
    dispatch(ProviderActions.getAstrologerReviewData());
    return () => {
      dispatch(ProviderActions.setAstrologerReviewData(null));
    }
  }, [dispatch]);

  const updateState = data => {
    setState(prevState => {
      const newData = { ...prevState, ...data }
      return newData
    })
  }

  const { seeMore, seeMore1 } = state

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyLoader isVisible={isLoading} />
      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={
            <>
              {astroData && astroDetailInfo()}
              {astroData && chatCallPriceInfo()}
              {astroData && aboutInfo()}
              {/* {astroData && skillsInfo()} */}
              {astroData && mainExpertiesInfo()}
              {/* {astroData && remediesInfo()}
              {reviewData && ratingInfo()}
              {reviewData && reviewInfo()} */}

            </>
          }
        />
        <TouchableOpacity 
        
        onPress={() => {
          Updateastroprofile();
      }}
        style={{ elevation: 1, paddingVertical: SCREEN_HEIGHT * 0.023, alignItems: "center", width: SCREEN_WIDTH * 0.8, borderRadius: 100, backgroundColor: colors.background_theme6, alignSelf: "center", position: "absolute", bottom: 10, }}>
          <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2) }}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  function reviewInfo() {
    const renderItem = ({ item }) => {

      return (
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: Colors.gray,
            marginBottom: 10,
            padding: Sizes.fixPadding,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  width: SCREEN_WIDTH * 0.12,
                  height: SCREEN_WIDTH * 0.12,
                  borderRadius: 100,
                  overflow: 'hidden',
                }}>
                <Image
                  source={{ uri: img_url + item?.customer?.image }}
                  resizeMode="cover"
                  style={{ width: '100%', height: '100%' }}
                />
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ ...Fonts.black14InterMedium }}>
                  {item?.customer?.customerName}
                </Text>
                <Text style={{ ...Fonts.gray14RobotoRegular }}>
                  {moment(item?.createdAt).format('DD MMM YYYY')}
                </Text>
              </View>
            </View>
            <View>
              <Stars
                default={parseFloat(item?.ratings)}
                disabled
                count={5}
                half={true}
                starSize={14}
                fullStar={
                  <Ionicons
                    name={'star'}
                    size={14}
                    color={colors.new_color}
                  />
                }
                emptyStar={
                  <Ionicons
                    name={'star-outline'}
                    size={14}
                    color={colors.new_color}
                  />
                }
                halfStar={
                  <Ionicons
                    size={14}
                    name={'star-half'}
                    style={{ color: Colors.primaryLight }}
                  />
                }
              />
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ ...Fonts.black12RobotoRegular }}>
              {item?.comments}
            </Text>
          </View>
        </View>
      );
    };
    return (
      <View
        style={{
          // paddingHorizontal: Sizes.fixPadding * 1.5,
          paddingTop: Sizes.fixPadding * 1.5,
          backgroundColor: Colors.white,
          paddingVertical: SCREEN_HEIGHT * 0.01
        }}>
        <View style={{ marginBottom: 15, alignItems: "center", borderBottomWidth: 1, borderBottomColor: Colors.gray2, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
          <Text style={{ color: colors.new_color, fontSize: 17, fontWeight: "600" }}>
            Customer Reviews
          </Text>
        </View>
        <View style={{ paddingHorizontal: Sizes.fixPadding * 1.5 }}>
          <FlatList
            data={reviewData?.reviews}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={NoDATA()}
          />
        </View>
      </View>
    );
    function NoDATA() {
      return (
        <View style={{ justifyContent: 'center', alignItems: "center", paddingVertical: SCREEN_HEIGHT * 0.2 }}>
          <Text style={{ ...Fonts.black11InterMedium, fontSize: 17 }}>No Reviews Found</Text>

        </View>
      )
    }
  }

  function ratingInfo() {
    // console.log(astroData?.rating, 'rating')

    return (
      <View
        style={{
          paddingVertical: SCREEN_HEIGHT * 0.01,
          backgroundColor: Colors.white,
        }}>
        <View style={{ alignItems: "center", borderBottomWidth: 1, borderBottomColor: Colors.gray2, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
          <Text style={{ fontSize: 17, fontWeight: "600", color: colors.new_color }}>
            Rating and Reviews
          </Text>
        </View>

        <View style={{ padding: Sizes.fixPadding * 1.5, }}>
          <Text style={{ ...Fonts.black22RobotoMedium }}>{reviewData?.summary?.totalReview}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Stars
              default={reviewData?.summary?.averageRating ?? reviewData?.summary?.averageRating}
              disabled
              count={5}
              half={true}
              starSize={20}
              fullStar={
                <Ionicons name={'star'} size={20} color={colors.new_color} />
              }
              emptyStar={
                <Ionicons
                  name={'star-outline'}
                  size={20}
                  color={Colors.gray}
                />
              }
              halfStar={
                <Ionicons
                  size={20}
                  name={'star-half'}
                  style={{ color: colors.new_color }}
                />
              }
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
            }}>
            <Ionicons name={'people'} size={18} color={Colors.black} />
            <Text style={{ ...Fonts.black14InterMedium, marginLeft: 5 }}>
              {reviewData?.summary?.totalUsers} Total
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ ...Fonts.black14InterMedium, marginRight: 5 }}>
                  5
                </Text>
                <Ionicons name={'star'} size={14} color={Colors.gray} />
              </View>
              <View
                style={{
                  backgroundColor: Colors.grayLight,
                  width: SCREEN_WIDTH * 0.7,
                  height: SCREEN_WIDTH * 0.04,
                  borderRadius: 10,
                  overflow: 'hidden',
                  marginLeft: 10,
                }}>
                <View
                  style={{
                    backgroundColor: colors.new_color,
                    width: `${reviewData?.summary?.fivePercentage ?? 0}%`,
                    height: '100%',
                  }}></View>
              </View>
            </View>
            <Text style={{ ...Fonts.gray14RobotoMedium, marginLeft: 10 }}>
              {reviewData?.summary?.fiveRating}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ ...Fonts.black14InterMedium, marginRight: 5 }}>
                  4
                </Text>
                <Ionicons name={'star'} size={14} color={Colors.gray} />
              </View>
              <View
                style={{
                  backgroundColor: Colors.grayLight,
                  width: SCREEN_WIDTH * 0.7,
                  height: SCREEN_WIDTH * 0.04,
                  borderRadius: 10,
                  overflow: 'hidden',
                  marginLeft: 10,
                }}>
                <View
                  style={{
                    backgroundColor: colors.new_color,
                    width: `${reviewData?.summary?.fourPercentage ?? 0}%`,
                    height: '100%',
                  }}></View>
              </View>
            </View>
            <Text style={{ ...Fonts.gray14RobotoMedium, marginLeft: 10 }}>
              {reviewData?.summary?.fourRating}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ ...Fonts.black14InterMedium, marginRight: 5 }}>
                  3
                </Text>
                <Ionicons name={'star'} size={14} color={Colors.gray} />
              </View>
              <View
                style={{
                  backgroundColor: Colors.grayLight,
                  width: SCREEN_WIDTH * 0.7,
                  height: SCREEN_WIDTH * 0.04,
                  borderRadius: 10,
                  overflow: 'hidden',
                  marginLeft: 10,
                }}>
                <View
                  style={{
                    backgroundColor: colors.new_color,
                    width: `${reviewData?.summary?.threePrecentage ?? 0}%`,
                    height: '100%',
                  }}></View>
              </View>
            </View>
            <Text style={{ ...Fonts.gray14RobotoMedium, marginLeft: 10 }}>
              {reviewData?.summary?.threeRating}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ ...Fonts.black14InterMedium, marginRight: 5 }}>
                  2
                </Text>
                <Ionicons name={'star'} size={14} color={Colors.gray} />
              </View>
              <View
                style={{
                  backgroundColor: Colors.grayLight,
                  width: SCREEN_WIDTH * 0.7,
                  height: SCREEN_WIDTH * 0.04,
                  borderRadius: 10,
                  overflow: 'hidden',
                  marginLeft: 10,
                }}>
                <View
                  style={{
                    backgroundColor: colors.new_color,
                    width: `${reviewData?.summary?.twoPercentage ?? 0}%`,
                    height: '100%',
                  }}></View>
              </View>
            </View>
            <Text style={{ ...Fonts.gray14RobotoMedium, marginLeft: 10 }}>
              {reviewData?.summary?.twoRating}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ ...Fonts.black14InterMedium, marginRight: 5 }}>
                  1
                </Text>
                <Ionicons name={'star'} size={14} color={Colors.gray} />
              </View>
              <View
                style={{
                  backgroundColor: Colors.grayLight,
                  width: SCREEN_WIDTH * 0.7,
                  height: SCREEN_WIDTH * 0.04,
                  borderRadius: 10,
                  overflow: 'hidden',
                  marginLeft: 10,
                }}>
                <View
                  style={{
                    backgroundColor: colors.new_color,
                    width: `${reviewData?.summary?.onePercentage ?? 0}%`,
                    height: '100%',
                  }}></View>
              </View>
            </View>
            <Text style={{ ...Fonts.gray14RobotoMedium, marginLeft: 10 }}>
              {reviewData?.summary?.oneRating}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function mainExpertiesInfo() {
    return (
      // <View style={{ backgroundColor: Colors.white, marginBottom: Sizes.fixPadding, paddingVertical: SCREEN_HEIGHT * 0.01 }}>

      //   <View style={{ alignItems: "center", borderBottomWidth: 1, borderBottomColor: Colors.gray2, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
      //     <Text style={{ fontSize: 17, fontWeight: "600", color: colors.new_color }}>Main Experties</Text>
      //   </View>


      //   <View style={{ padding: Sizes.fixPadding * 1.5, }}>
      //     <Text
      //       textBreakStrategy='highQuality'
      //       style={{ ...Fonts.black14RobotoRegular, }}
      //     >{astroData?.mainExpertise && astroData?.mainExpertise.map(item => item?.mainExpertise).join(', ')}</Text>

      //   </View>
      // </View>
      <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.025, }}>


        <View style={{ flexDirection: "row", justifyContent: "space-between", }}>

          <View>
            <Text style={{ ...Fonts.helveticaBoldBlack, fontSize: responsiveFontSize(1.8) }}>
              Category
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("Expertise")}
            >
              <Image
                style={{ height: SCREEN_HEIGHT * 0.025, width: SCREEN_WIDTH * 0.05 }}
                source={require('../../assets/images/Subtract.png')} />
            </TouchableOpacity>
          </View>

        </View>

        <View style={{ paddingVertical: SCREEN_HEIGHT * 0.02, alignItems: "center" }}>



          {selectedExpertise.length > 0 ? (
            <FlatList

              data={selectedExpertise}

              numColumns={3}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                // <Text style={{ ...Fonts.helveticaRegular, fontSize: responsiveFontSize(1.8), marginHorizontal: 2, color: colors.black_color9 }}>
                //   {item}
                // </Text>
                <View style={{ width: SCREEN_WIDTH * 0.25, paddingVertical: SCREEN_HEIGHT * 0.01, alignItems: "center", borderRadius: 100, margin: 5, backgroundColor: "#EFEFEF", elevation: 1 }}>
                  <Text style={{ ...Fonts.black11InterMedium }}> {item}</Text>

                </View>

              )}
            />
          ) : (
            <Text style={{ ...Fonts.helveticaRegular, fontSize: responsiveFontSize(1.8) }}>
              No languages selected.
            </Text>
          )}



        </View>

        <View style={{ paddingTop: SCREEN_HEIGHT * 0.2 }}>

        </View>







      </View>
    )
  }

  // function remediesInfo() {
  //   return (
  //     <View style={{ backgroundColor: Colors.white, marginBottom: Sizes.fixPadding ,paddingVertical:SCREEN_HEIGHT*0.01}}>
  //       <View style={{alignItems:"center"  ,borderBottomWidth:1 ,borderBottomColor:Colors.gray2 ,paddingVertical:SCREEN_HEIGHT*0.01}}>
  //         <Text style={{  fontWeight:"600",fontSize:17,color:colors.new_color}}>Remedies</Text>
  //       </View>
  //       <View style={{padding: Sizes.fixPadding * 1.5}}>
  //       <Text
  //         textBreakStrategy='highQuality'
  //         style={{ ...Fonts.black14RobotoRegular, }}
  //       >{astroData?.remedies && astroData?.remedies.map(item => item?.title).join(', ')}</Text>
  //    </View>
  //     </View>
  //   )
  // }
  function remediesInfo() {
    const renderItem = ({ item }) => {
      return (
        <View style={{ backgroundColor: '#F6F5F5', width: SCREEN_WIDTH / 2 - Sizes.fixPadding, marginHorizontal: Sizes.fixPadding, borderRadius: 10, marginTop: Sizes.fixPadding }}>
          <Text style={{ ...Fonts.primaryDark18RobotoMedium, marginTop: Sizes.fixPadding, textAlign: 'center', color: colors.new_color }}>{item?.title}</Text>
          <View style={{ paddingVertical: Sizes.fixPadding * 0.3, backgroundColor: Colors.white }}>

          </View>

          {item?.description ? (<Text
            textBreakStrategy='highQuality'
            style={{ ...Fonts.black14InterMedium, padding: Sizes.fixPadding * 1.5, }}
          >{item?.description?.length > 10 && !seeMore ? item?.description.slice(0, 90) : item?.description}<Text onPress={() => updateState({ seeMore: !seeMore })} style={{ color: colors.new_color }}> {item?.description.length > 10 ? seeMore ? 'Read less...' : 'Read more...' : ''}</Text></Text>) : <Text style={{ textAlign: 'center', color: Colors.grayA }}>No Description Found </Text>}
        </View>
      )
    }
    return (
      <View style={{ backgroundColor: Colors.white }}>
        <View style={{ marginTop: Sizes.fixPadding * 1.5, borderBottomWidth: 1, borderBottomColor: Colors.gray2 }}>
          <Text style={{ fontSize: 17., fontWeight: "600", color: colors.new_color, marginBottom: Sizes.fixPadding, textAlign: 'center', color: colors.new_color }}>Remedies</Text>
        </View>
        <FlatList
          data={astroData?.remedies}
          renderItem={renderItem}

          horizontal
        />
      </View>
    )
  }

  function skillsInfo() {
    return (
      <View style={{ padding: Sizes.fixPadding * 1.5, backgroundColor: Colors.white, marginBottom: Sizes.fixPadding }}>
        <Text style={{ ...Fonts.black18RobotoMedium, marginBottom: Sizes.fixPadding }}>Skills</Text>
        <Text
          textBreakStrategy='highQuality'
          style={{ ...Fonts.black14RobotoRegular, }}
        >{astroData?.skill && astroData?.skill.map(item => item?.skill).join(', ')}</Text>
      </View>
    )
  }

  function aboutInfo() {
    return (
      // <View style={{ backgroundColor: Colors.white, marginBottom: Sizes.fixPadding, }}>
      //   <View style={{ alignItems: "center", borderBottomWidth: 1, borderBottomColor: Colors.gray2, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
      //     {/* <Text style={{ ...Fonts.black18RobotoMedium, marginBottom: Sizes.fixPadding ,fontWeight:"600"}}>About</Text> */}
      //     <Text style={{ fontWeight: "600", color: colors.new_color, fontSize: 18 }}>About</Text>
      //   </View>
      //   <View style={{ padding: Sizes.fixPadding * 1.5, }}>
      //     <Text
      //       textBreakStrategy='highQuality'
      //       style={{ ...Fonts.black14RobotoRegular, }}
      //     >{astroData?.long_bio.length > 350 && !seeMore1 ? astroData?.long_bio.slice(0, 350) : astroData?.long_bio}<Text onPress={() => updateState({ seeMore1: !seeMore1 })} style={{ color: '#F45F4B' }}> {astroData?.long_bio.length > 350 ? seeMore1 ? '...Read less' : '...Read more' : ''}</Text></Text>
      //   </View>
      // </View>
      <View style={{ paddingVertical: SCREEN_HEIGHT * 0.025, backgroundColor: "white", gap: SCREEN_HEIGHT * 0.03 }}>
        <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.025, }}>


          <View style={{ width: SCREEN_WIDTH * 0.17, alignItems: "center", justifyContent: "center", paddingVertical: SCREEN_HEIGHT * 0.001, borderRadius: 100, backgroundColor: Colors.white, position: "absolute", zIndex: 1, left: SCREEN_WIDTH * 0.07, bottom: SCREEN_HEIGHT * 0.06 }}>
            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1), color: colors.black_color6 }}>Starting Year</Text>
          </View>


          <View style={{ elevation: 2, paddingVertical: SCREEN_HEIGHT * 0.02, paddingHorizontal: SCREEN_WIDTH * 0.03, borderRadius: 10, backgroundColor: "#F3F3F3" }}>
            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.8) }}>{astroData?.experience}</Text>
          </View>
        </View>

        <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.025, }}>


          <View style={{ width: SCREEN_WIDTH * 0.25, alignItems: "center", justifyContent: "center", paddingVertical: SCREEN_HEIGHT * 0.001, borderRadius: 100, backgroundColor: Colors.white, position: "absolute", zIndex: 1, left: SCREEN_WIDTH * 0.07, bottom: SCREEN_HEIGHT * 0.06 }}>
            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1), color: colors.black_color6 }}>Preferred languages</Text>
          </View>


          <View style={{ borderWidth: 1, paddingVertical: SCREEN_HEIGHT * 0.02, paddingHorizontal: SCREEN_WIDTH * 0.03, borderRadius: 10, borderColor: colors.black_color4, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            {/* <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.8) }}>{[...astroData?.language].join(', ')}</Text> */}


            {selectedLanguages.length > 0 ? (
              <FlatList
                horizontal={true}
                data={selectedLanguages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Text style={{ ...Fonts.helveticaRegular, fontSize: responsiveFontSize(1.8), marginHorizontal: 2, color: colors.black_color9 }}>
                    {item}
                  </Text>
                )}
              />
            ) : (
              <Text style={{ ...Fonts.helveticaRegular, fontSize: responsiveFontSize(1.8) }}>
                No languages selected.
              </Text>
            )}

            <TouchableOpacity
              onPress={() => navigation.navigate("SelectLanguage")}
            >
              <Image
                style={{ height: SCREEN_HEIGHT * 0.025, width: SCREEN_WIDTH * 0.05 }}
                source={require('../../assets/images/Subtract.png')} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.025, }}>


          <View style={{ width: SCREEN_WIDTH * 0.25, alignItems: "center", justifyContent: "center", paddingVertical: SCREEN_HEIGHT * 0.001, borderRadius: 100, backgroundColor: Colors.white, position: "absolute", zIndex: 1, left: SCREEN_WIDTH * 0.07, bottom: SCREEN_HEIGHT * 0.06 }}>
            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1), color: colors.black_color6 }}>Preferred Location</Text>
          </View>


          <View style={{ borderWidth: 1, paddingVertical: SCREEN_HEIGHT * 0.02, paddingHorizontal: SCREEN_WIDTH * 0.03, borderRadius: 10, borderColor: colors.black_color4, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={{  fontSize: responsiveFontSize(1.8) }}> {subLocationData ? subLocationData?.address : t("select_location")}</Text>

            <TouchableOpacity  onPress={() => {
            navigation.navigate('PlaceOfBirth', {
              type: 'sub'
            });
          }}>
              <Image
                style={{ height: SCREEN_HEIGHT * 0.025, width: SCREEN_WIDTH * 0.05 }}
                source={require('../../assets/images/Subtract.png')} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.025, gap: 8 }}>
          <View style={{ gap: SCREEN_HEIGHT * 0.01 }}>
            <Text style={{ ...Fonts.helveticaBoldBlack, fontSize: responsiveFontSize(1.8) }}>
              About My Service
            </Text>
            <View style={{ backgroundColor: "#EFEFEF", paddingVertical: SCREEN_HEIGHT * 0.01, borderRadius: 10, paddingHorizontal: SCREEN_WIDTH * 0.03 }}>
              <Text style={{ ...Fonts.black11InterMedium }}>
                {astroData?.long_bio}
              </Text>
            </View>





          </View>
          <View style={{ gap: SCREEN_HEIGHT * 0.01 }}>
            <Text style={{ ...Fonts.helveticaBoldBlack, fontSize: responsiveFontSize(1.8) }}>
              Experience & Qualification
            </Text>
            <View style={{ backgroundColor: "#EFEFEF", paddingVertical: SCREEN_HEIGHT * 0.01, borderRadius: 10, paddingHorizontal: SCREEN_WIDTH * 0.03 }}>
              <Text style={{ ...Fonts.black11InterMedium }}>
                {astroData?.long_bio}
              </Text>
            </View>





          </View>
        </View>
      </View>

    )
  }

  function chatCallPriceInfo() {
    const chatmultiply2 = (astroData?.chat_price + parseFloat(astroData?.commission_chat_price)) + (astroData?.chat_price + parseFloat(astroData?.commission_chat_price))
    const callmultiply2 = (astroData?.call_price + parseFloat(astroData?.commission_call_price)) + (astroData?.call_price + parseFloat(astroData?.commission_call_price))
    const VideoCall2 = (astroData?.normal_video_call_price + parseFloat(astroData?.commission_normal_video_call_price)) + (astroData?.normal_video_call_price + parseFloat(astroData?.commission_normal_video_call_price))


    // return <View style={{ backgroundColor: Colors.white, marginTop: Sizes.fixPadding, marginBottom: Sizes.fixPadding, paddingBottom: 20, }}>

    //   <View style={{ alignItems: "center", paddingVertical: SCREEN_HEIGHT * 0.003, borderBottomWidth: 1, borderBottomColor: Colors.gray2 }}>
    //     <Text style={{ ...Fonts.black18RobotoMedium, marginBottom: Sizes.fixPadding * 0.5, color: colors.new_color, fontWeight: "700", }}>Services</Text>
    //   </View>

    //   <View style={{ flexDirection: 'row', marginHorizontal: Sizes.fixPadding, marginTop: Sizes.fixPadding }}>

    //     <LinearGradient
    //       colors={[colors.background_theme6, colors.background_theme6]}
    //       start={{ x: 0, y: 0 }}
    //       end={{ x: 1, y: 1 }}
    //       style={{ width: '30%', paddingVertical: Sizes.fixPadding * 0.6, borderRadius: 10 }}
    //     >
    //       <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

    //         <View style={{
    //           height: SCREEN_WIDTH * 0.08, width: SCREEN_WIDTH * 0.08, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white, marginLeft: Sizes.fixPadding * 0.6
    //         }}>
    //           <Ionicons
    //             name={'call'}
    //             size={17}
    //             color={Colors.primaryLight}
    //           />
    //         </View>
    //         <View style={{ backgroundColor: colors.white_color, paddingHorizontal: Sizes.fixPadding * 1.5, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
    //           <Text style={{ ...Fonts.black14InterMedium, color: Colors.primaryLight }}>Call</Text>
    //         </View>

    //       </View>
    //       <View style={{ marginVertical: Sizes.fixPadding }}>
    //         <Text style={styles.servicesCol2}>{showNumber(astroData?.call_price + parseFloat(astroData?.commission_call_price))}/min</Text>
    //         <Text style={styles.servicesCol3}>{showNumber(callmultiply2)} /min</Text>
    //       </View>
    //     </LinearGradient>

    //     <LinearGradient
    //       colors={[colors.background_theme6, colors.background_theme6]}
    //       start={{ x: 0, y: 0 }}
    //       end={{ x: 1, y: 1 }}
    //       style={{ width: '30%', paddingVertical: Sizes.fixPadding * 0.6, borderRadius: 10, marginHorizontal: Sizes.fixPadding * 1.5 }}
    //     >
    //       <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

    //         <View style={{
    //           height: SCREEN_WIDTH * 0.08, width: SCREEN_WIDTH * 0.08, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white, marginLeft: Sizes.fixPadding * 0.6
    //         }}>
    //           <Ionicons
    //             name={'chatbubbles-outline'}
    //             size={17}
    //             color={Colors.primaryLight}
    //           />
    //         </View>
    //         <View style={{ backgroundColor: colors.white_color, paddingHorizontal: Sizes.fixPadding * 1.2, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
    //           <Text style={{ ...Fonts.black14InterMedium, color: Colors.primaryLight }}>Chat</Text>
    //         </View>

    //       </View>
    //       <View style={{ marginVertical: Sizes.fixPadding }}>
    //         <Text style={styles.servicesCol2}>{showNumber(astroData?.chat_price + parseFloat(astroData?.commission_chat_price))}/min</Text>
    //         <Text style={styles.servicesCol3}>{showNumber(chatmultiply2)} /min</Text>
    //       </View>
    //     </LinearGradient>

    //     <LinearGradient
    //       colors={[colors.background_theme6, colors.background_theme6]}
    //       start={{ x: 0, y: 0 }}
    //       end={{ x: 1, y: 1 }}
    //       style={{ width: '30%', paddingVertical: Sizes.fixPadding * 0.6, borderRadius: 10 }}
    //     >
    //       <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>



    //         <View style={{
    //           height: SCREEN_WIDTH * 0.08, width: SCREEN_WIDTH * 0.08, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white, marginLeft: Sizes.fixPadding * 0.6
    //         }}>
    //           <Ionicons
    //             name={'videocam'}
    //             size={17}
    //             color={Colors.primaryLight}
    //           />
    //         </View>
    //         <View style={{ backgroundColor: colors.white_color, paddingHorizontal: Sizes.fixPadding * 1, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
    //           <Text style={{ ...Fonts.black14InterMedium, color: Colors.primaryLight }}>Video</Text>
    //         </View>

    //       </View>
    //       <View style={{ marginVertical: Sizes.fixPadding }}>
    //         <Text style={styles.servicesCol2}>{showNumber(astroData?.normal_video_call_price + parseFloat(astroData?.commission_normal_video_call_price))}/min</Text>
    //         <Text style={styles.servicesCol3}>{showNumber(VideoCall2)} /min</Text>
    //       </View>
    //     </LinearGradient>
    //     <View>
    //     </View>

    //   </View>
    //   {/* <View style={styles.servicesContainer}>
    //     <Text style={styles.servicesCol1}>Chat Consultants</Text>
    //     <Text style={styles.servicesCol2}>{showNumber(astroData?.chat_price + parseFloat(astroData?.commission_chat_price))}/min</Text>
    //   </View>
    //   <View style={styles.servicesContainer}>
    //     <Text style={styles.servicesCol1}>Call Consultants</Text>
    //     <Text style={styles.servicesCol2}>{showNumber(astroData?.call_price + parseFloat(astroData?.commission_call_price))}/min</Text>
    //   </View>
    //   <View style={styles.servicesContainer}>
    //     <Text style={styles.servicesCol1}>Video Call Consultants</Text>
    //     <Text style={styles.servicesCol2}>{showNumber(astroData?.video_call_price + parseFloat(astroData?.commission_video_call_price))}/min</Text>
    //   </View> */}
    // </View>;
    return (

      <View style={{ backgroundColor: "white", gap: SCREEN_HEIGHT * 0.01 }}>
        <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.025, flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "white", paddingBottom: SCREEN_HEIGHT * 0.01 }}>



          <View>
            <View style={{ width: SCREEN_WIDTH * 0.2, alignItems: "center", justifyContent: "center", paddingVertical: SCREEN_HEIGHT * 0.001, borderRadius: 100, backgroundColor: Colors.white, position: "absolute", zIndex: 1, left: SCREEN_WIDTH * 0.05, bottom: SCREEN_HEIGHT * 0.06 }}>
              <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1), color: colors.black_color6 }}>Call charge min.</Text>
            </View>
            <View style={{ elevation: 2, paddingVertical: SCREEN_HEIGHT * 0.02, paddingHorizontal: SCREEN_WIDTH * 0.03, borderRadius: 10, backgroundColor: "#F3F3F3", width: SCREEN_WIDTH * 0.45 }}>
              <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.7) }}>{showNumber(astroData?.call_price + parseFloat(astroData?.commission_call_price))}/min</Text>
            </View>
          </View>

          <View>
            <View style={{ width: SCREEN_WIDTH * 0.2, alignItems: "center", justifyContent: "center", paddingVertical: SCREEN_HEIGHT * 0.001, borderRadius: 100, backgroundColor: Colors.white, position: "absolute", zIndex: 1, left: SCREEN_WIDTH * 0.05, bottom: SCREEN_HEIGHT * 0.06 }}>
              <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1), color: colors.black_color6 }}>Chat charge min .</Text>
            </View>
            <View style={{ elevation: 2, paddingVertical: SCREEN_HEIGHT * 0.02, paddingHorizontal: SCREEN_WIDTH * 0.03, borderRadius: 10, backgroundColor: "#F3F3F3", width: SCREEN_WIDTH * 0.45 }}>
              <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.7) }}>{showNumber(astroData?.chat_price + parseFloat(astroData?.commission_chat_price))}/min</Text>
            </View>
          </View>

        </View>

        <View style={{ alignItems: "center", paddingVertical: SCREEN_HEIGHT * 0.01, backgroundColor: colors.background_theme6, elevation: 2 }}>
          <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2) }}>
            About
          </Text>
        </View>

      </View>
    )
  }

  function astroDetailInfo() {
    return (
      // <ImageBackground
      //   source={require('../../assets/images/astrologer_background.png')}
      //   style={{
      //     flex: 0,
      //     paddingHorizontal: 15,
      //     paddingVertical: 15,
      //   }}>

      //   <View
      //     style={{
      //       flex: 0,
      //       flexDirection: 'row',
      //       alignItems: 'center',
      //       justifyContent: 'space-around',
      //       position: 'relative',
      //       bottom: -20,
      //       zIndex: 1,
      //     }}>
      //   </View>
      //   <View
      //     style={{
      //       flex: 0,
      //       width: '80%',
      //       alignSelf: 'center',

      //       backgroundColor: 'rgba(0.741, 0.741, 0.741, 0.451)',
      //       borderRadius: 20,
      //       paddingVertical: width * 0.12,
      //       marginTop: 10,
      //     }}>

      //     <Text style={{ ...Fonts.white16RobotoMedium, position: 'absolute', top: 10, left: 10 }}>{astroData?.astrologerName}</Text>

      //     <View style={{
      //       flexDirection: 'row',
      //       justifyContent: 'center',


      //     }}>
      //       <Image
      //         source={{ uri: base_url + astroData?.profileImage }}
      //         style={{
      //           width: width * 0.25,
      //           height: width * 0.25,
      //           borderWidth: 2,
      //           borderRadius: (width * 0.25) / 2,
      //           borderColor: colors.new_color,
      //           position: 'relative',
      //           left: (-width * 0.25) / 2,
      //           marginLeft: 10,
      //           shadowColor: '#000',
      //           shadowOffset: {
      //             width: 0,
      //             height: 4,
      //           },
      //           shadowOpacity: 0.3,
      //           shadowRadius: 4.65,
      //         }}
      //       />
      //       <View
      //         style={{
      //           flex: 1,
      //           position: 'relative',
      //           justifyContent: 'center',
      //           left: (-width * 0.25) / 2.5,



      //         }}>

      //         <View style={{ flex: 0, flexDirection: 'row', marginBottom: 2, }}>
      //           <Ionicons
      //             name="people-circle-sharp"
      //             color={colors.white_color}
      //             size={15}
      //           />
      //           <View >
      //             <Text
      //               allowFontScaling={false}
      //               style={{
      //                 textAlign: 'center',
      //                 fontSize: 13,
      //                 color: colors.white_color,
      //                 fontFamily: fonts.medium,
      //                 // flex:1,

      //               }}
      //             >
      //              {astroData?.skill && astroData?.skill.map(item => item?.skill).join(', ')}
      //             </Text>
      //           </View>




      //         </View>

      //         <View style={{ flex: 0, flexDirection: 'row', marginBottom: 2 }}>
      //           <MaterialCommunityIcons
      //             name="google-translate"
      //             color={colors.white_color}
      //             size={15}
      //           />
      //           <Text
      //             allowFontScaling={false}
      //             style={{
      //               width: '100%',
      //               marginLeft: 9,
      //               fontSize: 13,
      //               color: colors.white_color,
      //               fontFamily: fonts.medium,
      //             }}>
      //             {[...astroData?.language].join(', ')}
      //           </Text>
      //         </View>
      //         <View style={{ flex: 0, flexDirection: 'row', marginBottom: 2 }}>
      //           <MaterialIcons
      //             name="explicit"
      //             color={colors.white_color}
      //             size={15}
      //           />
      //           <Text
      //             allowFontScaling={false}
      //             style={{
      //               width: '100%',
      //               marginLeft: 9,
      //               fontSize: 13,
      //               color: colors.white_color,
      //               fontFamily: fonts.medium,
      //             }}>
      //             {`${t('experience')}: ${astroData?.experience}-Years`}
      //           </Text>
      //         </View>
      //       </View>
      //     </View>
      //   </View>
      // </ImageBackground>
      <View style={{ backgroundColor: "white", paddingVertical: 20, gap: SCREEN_HEIGHT * 0.02 }}>
        <View style={{ alignItems: "center", }}>

          <Image
            source={{ uri: base_url + astroData?.profileImage }}
            style={{
              width: width * 0.4,
              height: width * 0.4,
              borderWidth: 2,
              borderRadius: 100,
              borderColor: colors.background_theme6,




            }}
          />

        </View>

        <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.025 }}>


          <View style={{ width: SCREEN_WIDTH * 0.13, alignItems: "center", justifyContent: "center", paddingVertical: SCREEN_HEIGHT * 0.001, borderRadius: 100, backgroundColor: Colors.white, position: "absolute", zIndex: 1, left: SCREEN_WIDTH * 0.07, bottom: SCREEN_HEIGHT * 0.06 }}>
            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1), color: colors.black_color6 }}>Name</Text>
          </View>


          <View style={{ elevation: 2, paddingVertical: SCREEN_HEIGHT * 0.02, paddingHorizontal: SCREEN_WIDTH * 0.03, borderRadius: 10, backgroundColor: "#F3F3F3" }}>
            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2) }}> {astroData?.astrologerName}</Text>
          </View>
        </View>
      </View>
    );
  }

};

const mapStateToProps = state => ({
  astroData: state.provider.providerData,
  reviewData: state.provider.reviewData,
  locationData: state.setting.locationData,
  subLocationData: state.setting.subLocationData,
  UpdateProfile: state.history.UpdateProfile
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AstrologerDetailes);

const styles = StyleSheet.create({
  servicesContainer: {
    flexDirection: 'row',
    marginBottom: Sizes.fixPadding * 0.5
  },
  scrollView: {
    width: '100%',
  },
  servicesCol1: {
    ...Fonts.black14InterMedium,
    flex: 0.6
  },
  servicesCol2: {
    fontWeight: 'bold',
    fontSize: 14,
    flex: 0.4,
    color: colors.white_color,
    textAlign: 'center'

  },
  servicesCol3: {
    color: colors.white_color,
    fontSize: 12,
    flex: 0.4,
    textDecorationLine: 'line-through',
    textAlign: 'center'
  }

})  
