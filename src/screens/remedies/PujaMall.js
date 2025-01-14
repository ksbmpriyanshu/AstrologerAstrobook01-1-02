import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import PujaList from './PujaList';
import * as AssignedPujaActions from "../../redux/actions/AssignedPujaActions"


const PujaMall = ({ route ,navigation, dispatch, isLoading }) => {
    const {categoryId} = route?.params
    console.log("::::>>>",)
    useEffect(() => {
        dispatch(AssignedPujaActions.getAstromallData())
    }, [])

    return (
        <PujaList categoryId={categoryId}/>
        // <View style={{ flex: 1 }}>
        //     <MyHeader title={'Astro Puja'} navigation={navigation} />
        //     <Tab.Navigator>
        //         <Tab.Screen name='pooja' component={Pooja} />
        //         <Tab.Screen name='spell' component={Spell} />
        //         <Tab.Screen name='astromallHistroy' component={AstromallHistroy} options={{tabBarLabel: 'History'}} />
        //     </Tab.Navigator>
        // </View>
    )
}

const mapStateToProps = state => ({
    isLoading: state.setting.isLoading
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(PujaMall)