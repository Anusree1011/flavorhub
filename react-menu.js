// ============================================
// react-menu.js — React Menu Section
// ============================================
// React Concepts used here:
//   • Component  — a function that returns JSX (UI)
//   • Props      — data passed into a component
//   • useState   — remembers a value that can change
//   • .filter()  — shows only matching category items
// ============================================


// ---- STEP 1: Menu Data (our mini database) ----
var menuData = [
  // Starters
  { id:1,  name:"Veg Spring Rolls",     cat:"Starters",  price:"₹180", emoji:"🥟", desc:"Crispy rolls with spiced veggies",    veg:true,  spicy:false },
  { id:2,  name:"Chicken Wings",        cat:"Starters",  price:"₹280", emoji:"🍗", desc:"Tangy buffalo style chicken wings",    veg:false, spicy:true  },
  { id:3,  name:"Paneer Tikka",         cat:"Starters",  price:"₹240", emoji:"🧆", desc:"Grilled cottage cheese with spices",  veg:true,  spicy:true  },

  // Main Course
  { id:4,  name:"Butter Chicken",       cat:"Main",      price:"₹320", emoji:"🍛", desc:"Creamy tomato-based chicken curry",   veg:false, spicy:false },
  { id:5,  name:"Dal Makhani",          cat:"Main",      price:"₹240", emoji:"🫘", desc:"Slow cooked black lentils with cream",veg:true,  spicy:false },
  { id:6,  name:"Veg Biryani",          cat:"Main",      price:"₹260", emoji:"🍚", desc:"Aromatic basmati with vegetables",    veg:true,  spicy:true  },
  { id:7,  name:"Mutton Curry",         cat:"Main",      price:"₹380", emoji:"🥘", desc:"Tender mutton in spiced gravy",       veg:false, spicy:true  },

  // Desserts
  { id:8,  name:"Gulab Jamun",          cat:"Desserts",  price:"₹120", emoji:"🍮", desc:"Soft milk dumplings in sugar syrup",  veg:true,  spicy:false },
  { id:9,  name:"Chocolate Brownie",    cat:"Desserts",  price:"₹160", emoji:"🍫", desc:"Warm brownie with vanilla ice cream", veg:true,  spicy:false },

  // Drinks
  { id:10, name:"Mango Lassi",          cat:"Drinks",    price:"₹100", emoji:"🥭", desc:"Thick mango yogurt drink",            veg:true,  spicy:false },
  { id:11, name:"Masala Chai",          cat:"Drinks",    price:"₹60",  emoji:"☕", desc:"Spiced Indian tea",                  veg:true,  spicy:false },
  { id:12, name:"Fresh Lime Soda",      cat:"Drinks",    price:"₹80",  emoji:"🍋", desc:"Refreshing lime with soda",           veg:true,  spicy:false },
];

var categories = ["All", "Starters", "Main", "Desserts", "Drinks"];


// ---- STEP 2: Single Menu Card Component ----
// Takes one dish as props and shows its card.

function MenuCard(props) {
  // useState: track if this item was ordered
  var orderedState = React.useState(false);
  var ordered      = orderedState[0];
  var setOrdered   = orderedState[1];

  function handleOrder() {
    setOrdered(true);
    showToast(props.name + " added to order! 🍽️");
    setTimeout(function () { setOrdered(false); }, 2000);
  }

  return React.createElement(
    "div", { className: "menu-card" },

    // Food image / emoji area
    React.createElement(
      "div", { className: "menu-img" },
      props.emoji,

      // Veg / Non-veg indicator
      props.veg
        ? React.createElement("div", { className: "veg-tag" },
            React.createElement("div", { className: "veg-dot" })
          )
        : React.createElement("div", { className: "nonveg-tag" },
            React.createElement("div", { className: "nonveg-dot" })
          ),

      // Spicy badge
      props.spicy
        ? React.createElement("span", { className: "spicy-tag" }, "🌶 Spicy")
        : null
    ),

    // Card body
    React.createElement(
      "div", { className: "menu-body" },
      React.createElement("h3", { className: "menu-name" }, props.name),
      React.createElement("p",  { className: "menu-desc" }, props.desc),

      React.createElement(
        "div", { className: "menu-footer" },
        React.createElement("span", { className: "menu-price" }, props.price),
        React.createElement(
          "button",
          {
            className: "order-btn",
            onClick: handleOrder,
            style: ordered ? { background: "#2e7d32" } : {}
          },
          ordered ? "✓ Added!" : "Order"
        )
      )
    )
  );
}


// ---- STEP 3: Filter Tabs Component ----
// Shows category buttons. Active tab highlights in red.

function FilterTabs(props) {
  return React.createElement(
    "div", { className: "filter-tabs" },

    categories.map(function (cat) {
      return React.createElement(
        "button",
        {
          key: cat,
          className: props.active === cat ? "tab-btn active" : "tab-btn",
          onClick: function () { props.onSelect(cat); }
        },
        cat
      );
    })
  );
}


// ---- STEP 4: Full Menu Component ----
// Manages which category is selected.
// Filters menuData based on active tab.

function MenuSection() {
  // useState: track which category tab is selected
  var activeState = React.useState("All");
  var active      = activeState[0];
  var setActive   = activeState[1];

  // Filter items — if "All" show everything, else filter by category
  var filtered = active === "All"
    ? menuData
    : menuData.filter(function (item) { return item.cat === active; });

  return React.createElement(
    "div", null,

    // Filter tabs
    React.createElement(FilterTabs, {
      active: active,
      onSelect: setActive
    }),

    // Menu cards grid
    React.createElement(
      "div", { className: "menu-grid" },
      filtered.map(function (item) {
        return React.createElement(MenuCard, {
          key:   item.id,
          name:  item.name,
          price: item.price,
          emoji: item.emoji,
          desc:  item.desc,
          veg:   item.veg,
          spicy: item.spicy,
        });
      })
    )
  );
}


// ---- STEP 5: Mount React into the page ----
// Finds <div id="react-menu"> in index.html and renders inside it.

var container = document.getElementById("react-menu");
var root      = ReactDOM.createRoot(container);
root.render(React.createElement(MenuSection, null));
