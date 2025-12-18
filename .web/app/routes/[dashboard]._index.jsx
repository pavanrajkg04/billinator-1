import {Fragment,useCallback,useContext,useEffect} from "react"
import {Badge as RadixThemesBadge,Box as RadixThemesBox,Button as RadixThemesButton,Flex as RadixThemesFlex,Grid as RadixThemesGrid,Heading as RadixThemesHeading,Link as RadixThemesLink,Separator as RadixThemesSeparator,Spinner as RadixThemesSpinner,Text as RadixThemesText} from "@radix-ui/themes"
import {Link as ReactRouterLink} from "react-router"
import {ArrowDown as LucideArrowDown,ArrowUp as LucideArrowUp,BarChart as LucideBarChart,DollarSign as LucideDollarSign,Home as LucideHome,Package as LucidePackage,Receipt as LucideReceipt,Settings as LucideSettings,ShoppingCart as LucideShoppingCart,TrendingUp as LucideTrendingUp,TriangleAlert as LucideTriangleAlert,Truck as LucideTruck,UserCog as LucideUserCog,Users as LucideUsers,Warehouse as LucideWarehouse} from "lucide-react"
import {EventLoopContext,StateContexts} from "$/utils/context"
import {ReflexEvent,isTrue} from "$/utils/state"
import {jsx} from "@emotion/react"




function Button_9367dbea18b879d1ea2fa5c3bed14925 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_671fdd3f4ac074085d8eaa0ffa71202e = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___dashboard____dashboard_state.refresh_dashboard", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{css:({ ["icon"] : "refresh-cw", ["width"] : "100%", ["marginTop"] : "2" }),onClick:on_click_671fdd3f4ac074085d8eaa0ffa71202e,variant:"outline"},"Refresh")
  )
}


function Text_aa0ee4b29e96050d6f57a7814cd2caa4 () {
  const reflex___state____state__state____global_state = useContext(StateContexts.reflex___state____state__state____global_state)



  return (
    jsx(RadixThemesText,{as:"p",css:({ ["color"] : "gray.600" }),size:"4"},("Welcome back, "+reflex___state____state__state____global_state.username_rx_state_))
  )
}


function Button_a415b1d11aca815f400178b31b2620df () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_671fdd3f4ac074085d8eaa0ffa71202e = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___dashboard____dashboard_state.refresh_dashboard", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{css:({ ["icon"] : "refresh-cw" }),onClick:on_click_671fdd3f4ac074085d8eaa0ffa71202e,variant:"outline"},"Refresh")
  )
}


function Button_402e08a0766967d34eb17a9174ba3e3c () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_4fc2dd530418b4899044070e17e13d3e = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___auth____auth_state.logout", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{color:"red",css:({ ["icon"] : "log-out" }),onClick:on_click_4fc2dd530418b4899044070e17e13d3e,variant:"outline"},"Logout")
  )
}


function Heading_429bddd35007751a1576b9449d6299ee () {
  const reflex___state____state__state____global_state__pages___dashboard____dashboard_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___dashboard____dashboard_state)



  return (
    jsx(RadixThemesHeading,{css:({ ["color"] : "green.600", ["marginTop"] : "2" }),size:"7"},("\u20b9 "+(reflex___state____state__state____global_state__pages___dashboard____dashboard_state.total_sales_rx_state_.toLocaleString('en-US', ((decimals) => ({minimumFractionDigits: decimals, maximumFractionDigits: decimals}))(2)).replaceAll(',', ","))))
  )
}


function Heading_6db537c2372170e627b10d08d9b9360d () {
  const reflex___state____state__state____global_state__pages___dashboard____dashboard_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___dashboard____dashboard_state)



  return (
    jsx(RadixThemesHeading,{css:({ ["color"] : "blue.600", ["marginTop"] : "2" }),size:"7"},("\u20b9 "+(reflex___state____state__state____global_state__pages___dashboard____dashboard_state.total_purchases_rx_state_.toLocaleString('en-US', ((decimals) => ({minimumFractionDigits: decimals, maximumFractionDigits: decimals}))(2)).replaceAll(',', ","))))
  )
}


function Heading_9216f3f3af076c869abfb0d470c7d1ec () {
  const reflex___state____state__state____global_state__pages___dashboard____dashboard_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___dashboard____dashboard_state)



  return (
    jsx(RadixThemesHeading,{css:({ ["color"] : "orange.600", ["marginTop"] : "2" }),size:"7"},("\u20b9 "+(reflex___state____state__state____global_state__pages___dashboard____dashboard_state.outstanding_receivables_rx_state_.toLocaleString('en-US', ((decimals) => ({minimumFractionDigits: decimals, maximumFractionDigits: decimals}))(2)).replaceAll(',', ","))))
  )
}


function Heading_5ab59c6c1009058c3ba66e52cd6ea1b6 () {
  const reflex___state____state__state____global_state__pages___dashboard____dashboard_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___dashboard____dashboard_state)



  return (
    jsx(RadixThemesHeading,{css:({ ["color"] : "red.600", ["marginTop"] : "2" }),size:"7"},("\u20b9 "+(reflex___state____state__state____global_state__pages___dashboard____dashboard_state.outstanding_payables_rx_state_.toLocaleString('en-US', ((decimals) => ({minimumFractionDigits: decimals, maximumFractionDigits: decimals}))(2)).replaceAll(',', ","))))
  )
}


function Heading_eab07e281688059c1f8e391dd3af8601 () {
  const reflex___state____state__state____global_state__pages___dashboard____dashboard_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___dashboard____dashboard_state)



  return (
    jsx(RadixThemesHeading,{css:({ ["color"] : "purple.600", ["marginTop"] : "2" }),size:"7"},(JSON.stringify(reflex___state____state__state____global_state__pages___dashboard____dashboard_state.total_customers_rx_state_)))
  )
}


function Heading_c29edb30ee352d93fdb6e330e7d460c8 () {
  const reflex___state____state__state____global_state__pages___dashboard____dashboard_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___dashboard____dashboard_state)



  return (
    jsx(RadixThemesHeading,{css:({ ["color"] : "indigo.600", ["marginTop"] : "2" }),size:"7"},(JSON.stringify(reflex___state____state__state____global_state__pages___dashboard____dashboard_state.total_suppliers_rx_state_)))
  )
}


function Heading_0b36651a0aa56177b1ace3b6bdaf5f58 () {
  const reflex___state____state__state____global_state__pages___dashboard____dashboard_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___dashboard____dashboard_state)



  return (
    jsx(RadixThemesHeading,{css:({ ["color"] : "teal.600", ["marginTop"] : "2" }),size:"7"},(JSON.stringify(reflex___state____state__state____global_state__pages___dashboard____dashboard_state.total_products_rx_state_)))
  )
}


function Heading_8566ddfc18ef4fbac915bad5ed8faff1 () {
  const reflex___state____state__state____global_state__pages___dashboard____dashboard_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___dashboard____dashboard_state)



  return (
    jsx(RadixThemesHeading,{css:({ ["color"] : "red.600", ["marginTop"] : "2" }),size:"7"},(JSON.stringify(reflex___state____state__state____global_state__pages___dashboard____dashboard_state.low_stock_count_rx_state_)))
  )
}


function Flex_3926080cb66d2064cc4aba2e3e519d97 () {
  const reflex___state____state__state____global_state__pages___dashboard____dashboard_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___dashboard____dashboard_state)



  return (
    jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"3"},Array.prototype.map.call(reflex___state____state__state____global_state__pages___dashboard____dashboard_state.sales_display_rx_state_ ?? [],((sale_text_rx_state_,index_20bdd6c78ab3576b04d810622357b2b9)=>(jsx(RadixThemesBox,{css:({ ["width"] : "100%", ["borderBottom"] : "1px solid", ["borderColor"] : "gray.200" }),key:index_20bdd6c78ab3576b04d810622357b2b9},jsx(RadixThemesText,{as:"p",css:({ ["padding"] : "2" })},sale_text_rx_state_))))))
  )
}


function Fragment_4b3078a2e564148d58fbaa0426cfad40 () {
  const reflex___state____state__state____global_state__pages___dashboard____dashboard_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___dashboard____dashboard_state)



  return (
    jsx(Fragment,{},((reflex___state____state__state____global_state__pages___dashboard____dashboard_state.sales_display_rx_state_.length > 0)?(jsx(Fragment,{},jsx(Flex_3926080cb66d2064cc4aba2e3e519d97,{},))):(jsx(Fragment,{},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "gray.500", ["padding"] : "4" })},"No sales yet")))))
  )
}


function Flex_76477dd1262a4a9b571c10c6775ee8b7 () {
  const reflex___state____state__state____global_state__pages___dashboard____dashboard_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___dashboard____dashboard_state)



  return (
    jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"3"},Array.prototype.map.call(reflex___state____state__state____global_state__pages___dashboard____dashboard_state.purchases_display_rx_state_ ?? [],((purchase_text_rx_state_,index_20bdd6c78ab3576b04d810622357b2b9)=>(jsx(RadixThemesBox,{css:({ ["width"] : "100%", ["borderBottom"] : "1px solid", ["borderColor"] : "gray.200" }),key:index_20bdd6c78ab3576b04d810622357b2b9},jsx(RadixThemesText,{as:"p",css:({ ["padding"] : "2" })},purchase_text_rx_state_))))))
  )
}


function Fragment_fb1b7881d2b0ff1e08f26f08609a197b () {
  const reflex___state____state__state____global_state__pages___dashboard____dashboard_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___dashboard____dashboard_state)



  return (
    jsx(Fragment,{},((reflex___state____state__state____global_state__pages___dashboard____dashboard_state.purchases_display_rx_state_.length > 0)?(jsx(Fragment,{},jsx(Flex_76477dd1262a4a9b571c10c6775ee8b7,{},))):(jsx(Fragment,{},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "gray.500", ["padding"] : "4" })},"No purchases yet")))))
  )
}


function Flex_e395a449cdc5a4b5a492bc48a56af1a1 () {
  const reflex___state____state__state____global_state__pages___dashboard____dashboard_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___dashboard____dashboard_state)



  return (
    jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"3"},Array.prototype.map.call(reflex___state____state__state____global_state__pages___dashboard____dashboard_state.stock_display_rx_state_ ?? [],((stock_text_rx_state_,index_2e8efdf09d14bd0740ee57ff4e8a8307)=>(jsx(RadixThemesBox,{css:({ ["width"] : "100%", ["borderBottom"] : "1px solid", ["borderColor"] : "red.200" }),key:index_2e8efdf09d14bd0740ee57ff4e8a8307},jsx(RadixThemesText,{as:"p",css:({ ["padding"] : "2", ["color"] : "red.600" }),weight:"bold"},stock_text_rx_state_))))))
  )
}


function Fragment_68d24ed19b32effe1e588b4150e94c9b () {
  const reflex___state____state__state____global_state__pages___dashboard____dashboard_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___dashboard____dashboard_state)



  return (
    jsx(Fragment,{},((reflex___state____state__state____global_state__pages___dashboard____dashboard_state.low_stock_count_rx_state_ > 0)?(jsx(Fragment,{},jsx(RadixThemesBox,{css:({ ["padding"] : "6", ["borderRadius"] : "lg", ["border"] : "2px solid", ["borderColor"] : "red.200", ["background"] : "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)", ["width"] : "100%", ["marginBottom"] : "6" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"3"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"row",gap:"2"},jsx(LucideTriangleAlert,{css:({ ["color"] : "red.600" }),size:20},),jsx(RadixThemesHeading,{css:({ ["color"] : "red.600" }),size:"5"},"Low Stock Alert")),jsx(Flex_e395a449cdc5a4b5a492bc48a56af1a1,{},))))):(jsx(Fragment,{},))))
  )
}


function Fragment_9966f079dc024abe970c98be8297c5c5 () {
  const reflex___state____state__state____global_state__pages___dashboard____dashboard_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___dashboard____dashboard_state)



  return (
    jsx(Fragment,{},(reflex___state____state__state____global_state__pages___dashboard____dashboard_state.is_loading_rx_state_?(jsx(Fragment,{},jsx(RadixThemesFlex,{css:({ ["display"] : "flex", ["alignItems"] : "center", ["justifyContent"] : "center", ["width"] : "100%", ["height"] : "50vh" })},jsx(RadixThemesSpinner,{size:"3"},)))):(jsx(Fragment,{},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["padding"] : "2" }),direction:"column",gap:"6"},jsx(RadixThemesFlex,{align:"center",className:"rx-Stack",css:({ ["width"] : "100%", ["marginBottom"] : "6" }),direction:"row",gap:"3"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"column",gap:"1"},jsx(RadixThemesHeading,{size:"9",weight:"bold"},"Dashboard"),jsx(Text_aa0ee4b29e96050d6f57a7814cd2caa4,{},)),jsx(RadixThemesFlex,{css:({ ["flex"] : 1, ["justifySelf"] : "stretch", ["alignSelf"] : "stretch" })},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"row",gap:"3"},jsx(Button_a415b1d11aca815f400178b31b2620df,{},),jsx(Button_402e08a0766967d34eb17a9174ba3e3c,{},))),jsx(RadixThemesHeading,{css:({ ["marginTop"] : "4", ["marginBottom"] : "2" }),size:"6"},"Key Metrics"),jsx(RadixThemesGrid,{columns:"4",css:({ ["width"] : "100%", ["marginBottom"] : "6" }),gap:"4"},jsx(RadixThemesBox,{css:({ ["padding"] : "6", ["borderRadius"] : "lg", ["background"] : "linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)", ["border"] : "1px solid", ["borderColor"] : "gray.200", ["width"] : "100%", ["&:hover"] : ({ ["transform"] : "translateY(-2px)", ["boxShadow"] : "0 4px 12px rgba(0,0,0,0.1)" }), ["transition"] : "all 0.2s" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"3"},jsx(RadixThemesFlex,{align:"center",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(LucideTrendingUp,{css:({ ["color"] : "green.600" }),size:24},),jsx(RadixThemesFlex,{css:({ ["flex"] : 1, ["justifySelf"] : "stretch", ["alignSelf"] : "stretch" })},),jsx(RadixThemesBadge,{color:"gray",size:"1",variant:"soft"},"Total Sales")),jsx(Heading_429bddd35007751a1576b9449d6299ee,{},))),jsx(RadixThemesBox,{css:({ ["padding"] : "6", ["borderRadius"] : "lg", ["background"] : "linear-gradient(135deg, #cfe2ff 0%, #b6d4fe 100%)", ["border"] : "1px solid", ["borderColor"] : "gray.200", ["width"] : "100%", ["&:hover"] : ({ ["transform"] : "translateY(-2px)", ["boxShadow"] : "0 4px 12px rgba(0,0,0,0.1)" }), ["transition"] : "all 0.2s" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"3"},jsx(RadixThemesFlex,{align:"center",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(LucideShoppingCart,{css:({ ["color"] : "blue.600" }),size:24},),jsx(RadixThemesFlex,{css:({ ["flex"] : 1, ["justifySelf"] : "stretch", ["alignSelf"] : "stretch" })},),jsx(RadixThemesBadge,{color:"gray",size:"1",variant:"soft"},"Total Purchases")),jsx(Heading_6db537c2372170e627b10d08d9b9360d,{},))),jsx(RadixThemesBox,{css:({ ["padding"] : "6", ["borderRadius"] : "lg", ["background"] : "linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)", ["border"] : "1px solid", ["borderColor"] : "gray.200", ["width"] : "100%", ["&:hover"] : ({ ["transform"] : "translateY(-2px)", ["boxShadow"] : "0 4px 12px rgba(0,0,0,0.1)" }), ["transition"] : "all 0.2s" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"3"},jsx(RadixThemesFlex,{align:"center",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(LucideArrowUp,{css:({ ["color"] : "orange.600" }),size:24},),jsx(RadixThemesFlex,{css:({ ["flex"] : 1, ["justifySelf"] : "stretch", ["alignSelf"] : "stretch" })},),jsx(RadixThemesBadge,{color:"gray",size:"1",variant:"soft"},"Outstanding (Receivables)")),jsx(Heading_9216f3f3af076c869abfb0d470c7d1ec,{},))),jsx(RadixThemesBox,{css:({ ["padding"] : "6", ["borderRadius"] : "lg", ["background"] : "linear-gradient(135deg, #ffcccc 0%, #ff9999 100%)", ["border"] : "1px solid", ["borderColor"] : "gray.200", ["width"] : "100%", ["&:hover"] : ({ ["transform"] : "translateY(-2px)", ["boxShadow"] : "0 4px 12px rgba(0,0,0,0.1)" }), ["transition"] : "all 0.2s" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"3"},jsx(RadixThemesFlex,{align:"center",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(LucideArrowDown,{css:({ ["color"] : "red.600" }),size:24},),jsx(RadixThemesFlex,{css:({ ["flex"] : 1, ["justifySelf"] : "stretch", ["alignSelf"] : "stretch" })},),jsx(RadixThemesBadge,{color:"gray",size:"1",variant:"soft"},"Outstanding (Payables)")),jsx(Heading_5ab59c6c1009058c3ba66e52cd6ea1b6,{},)))),jsx(RadixThemesHeading,{css:({ ["marginTop"] : "4", ["marginBottom"] : "2" }),size:"6"},"Overview"),jsx(RadixThemesGrid,{columns:"4",css:({ ["width"] : "100%", ["marginBottom"] : "6" }),gap:"4"},jsx(RadixThemesBox,{css:({ ["padding"] : "6", ["borderRadius"] : "lg", ["background"] : "linear-gradient(135deg, #e9d5ff 0%, #d8b4fe 100%)", ["border"] : "1px solid", ["borderColor"] : "gray.200", ["width"] : "100%", ["&:hover"] : ({ ["transform"] : "translateY(-2px)", ["boxShadow"] : "0 4px 12px rgba(0,0,0,0.1)" }), ["transition"] : "all 0.2s" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"3"},jsx(RadixThemesFlex,{align:"center",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(LucideUsers,{css:({ ["color"] : "purple.600" }),size:24},),jsx(RadixThemesFlex,{css:({ ["flex"] : 1, ["justifySelf"] : "stretch", ["alignSelf"] : "stretch" })},),jsx(RadixThemesBadge,{color:"gray",size:"1",variant:"soft"},"Customers")),jsx(Heading_eab07e281688059c1f8e391dd3af8601,{},))),jsx(RadixThemesBox,{css:({ ["padding"] : "6", ["borderRadius"] : "lg", ["background"] : "linear-gradient(135deg, #ddd6fe 0%, #c4b5fd 100%)", ["border"] : "1px solid", ["borderColor"] : "gray.200", ["width"] : "100%", ["&:hover"] : ({ ["transform"] : "translateY(-2px)", ["boxShadow"] : "0 4px 12px rgba(0,0,0,0.1)" }), ["transition"] : "all 0.2s" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"3"},jsx(RadixThemesFlex,{align:"center",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(LucideTruck,{css:({ ["color"] : "indigo.600" }),size:24},),jsx(RadixThemesFlex,{css:({ ["flex"] : 1, ["justifySelf"] : "stretch", ["alignSelf"] : "stretch" })},),jsx(RadixThemesBadge,{color:"gray",size:"1",variant:"soft"},"Suppliers")),jsx(Heading_c29edb30ee352d93fdb6e330e7d460c8,{},))),jsx(RadixThemesBox,{css:({ ["padding"] : "6", ["borderRadius"] : "lg", ["background"] : "linear-gradient(135deg, #ccfbf1 0%, #99f6e4 100%)", ["border"] : "1px solid", ["borderColor"] : "gray.200", ["width"] : "100%", ["&:hover"] : ({ ["transform"] : "translateY(-2px)", ["boxShadow"] : "0 4px 12px rgba(0,0,0,0.1)" }), ["transition"] : "all 0.2s" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"3"},jsx(RadixThemesFlex,{align:"center",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(LucidePackage,{css:({ ["color"] : "teal.600" }),size:24},),jsx(RadixThemesFlex,{css:({ ["flex"] : 1, ["justifySelf"] : "stretch", ["alignSelf"] : "stretch" })},),jsx(RadixThemesBadge,{color:"gray",size:"1",variant:"soft"},"Products")),jsx(Heading_0b36651a0aa56177b1ace3b6bdaf5f58,{},))),jsx(RadixThemesBox,{css:({ ["padding"] : "6", ["borderRadius"] : "lg", ["background"] : "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)", ["border"] : "1px solid", ["borderColor"] : "gray.200", ["width"] : "100%", ["&:hover"] : ({ ["transform"] : "translateY(-2px)", ["boxShadow"] : "0 4px 12px rgba(0,0,0,0.1)" }), ["transition"] : "all 0.2s" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"3"},jsx(RadixThemesFlex,{align:"center",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(LucideTriangleAlert,{css:({ ["color"] : "red.600" }),size:24},),jsx(RadixThemesFlex,{css:({ ["flex"] : 1, ["justifySelf"] : "stretch", ["alignSelf"] : "stretch" })},),jsx(RadixThemesBadge,{color:"gray",size:"1",variant:"soft"},"Low Stock Items")),jsx(Heading_8566ddfc18ef4fbac915bad5ed8faff1,{},)))),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["marginBottom"] : "6" }),direction:"row",gap:"4"},jsx(RadixThemesBox,{css:({ ["padding"] : "6", ["borderRadius"] : "lg", ["border"] : "1px solid", ["borderColor"] : "gray.200", ["background"] : "white", ["flex"] : "1" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"3"},jsx(RadixThemesHeading,{css:({ ["marginBottom"] : "4" }),size:"5"},"Recent Sales"),jsx(Fragment_4b3078a2e564148d58fbaa0426cfad40,{},))),jsx(RadixThemesBox,{css:({ ["padding"] : "6", ["borderRadius"] : "lg", ["border"] : "1px solid", ["borderColor"] : "gray.200", ["background"] : "white", ["flex"] : "1" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"3"},jsx(RadixThemesHeading,{css:({ ["marginBottom"] : "4" }),size:"5"},"Recent Purchases"),jsx(Fragment_fb1b7881d2b0ff1e08f26f08609a197b,{},)))),jsx(Fragment_68d24ed19b32effe1e588b4150e94c9b,{},))))))
  )
}


export default function Component() {





  return (
    jsx(Fragment,{},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["height"] : "100vh" }),direction:"row",gap:"0"},jsx(RadixThemesBox,{css:({ ["width"] : "250px", ["height"] : "100vh", ["padding"] : "4", ["background"] : "gray.50", ["borderRight"] : "1px solid", ["borderColor"] : "gray.200" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["height"] : "100%" }),direction:"column",gap:"4"},jsx(RadixThemesHeading,{css:({ ["padding"] : "4" }),size:"6"},"Billinator"),jsx(RadixThemesSeparator,{size:"4"},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["padding"] : "2" }),direction:"column",gap:"2"},jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/dashboard"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideHome,{size:20},),jsx(RadixThemesText,{as:"p"},"Dashboard")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/products"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucidePackage,{size:20},),jsx(RadixThemesText,{as:"p"},"Products")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/customers"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideUsers,{size:20},),jsx(RadixThemesText,{as:"p"},"Customers")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/suppliers"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideTruck,{size:20},),jsx(RadixThemesText,{as:"p"},"Suppliers")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/purchases"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideShoppingCart,{size:20},),jsx(RadixThemesText,{as:"p"},"Purchases")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/sales"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideReceipt,{size:20},),jsx(RadixThemesText,{as:"p"},"Sales")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/stocks"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideWarehouse,{size:20},),jsx(RadixThemesText,{as:"p"},"Stocks")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/outstanding"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideDollarSign,{size:20},),jsx(RadixThemesText,{as:"p"},"Outstanding")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/reports"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideBarChart,{size:20},),jsx(RadixThemesText,{as:"p"},"Reports")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/users"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideUserCog,{size:20},),jsx(RadixThemesText,{as:"p"},"Users & Roles")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/settings"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideSettings,{size:20},),jsx(RadixThemesText,{as:"p"},"Settings"))))),jsx(RadixThemesSeparator,{size:"4"},),jsx(Button_9367dbea18b879d1ea2fa5c3bed14925,{},))),jsx(RadixThemesBox,{css:({ ["flex"] : "1", ["padding"] : "6", ["overflowY"] : "auto", ["height"] : "100vh" })},jsx(Fragment_9966f079dc024abe970c98be8297c5c5,{},))),jsx("title",{},"Dashboard - Billinator"),jsx("meta",{content:"favicon.ico",property:"og:image"},))
  )
}